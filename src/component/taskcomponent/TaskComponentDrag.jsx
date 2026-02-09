import React, { useState } from "react";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

const initialTasks = {
  todo: [
    { id: "1", title: "Design UI" },
    { id: "2", title: "Setup DB" },
  ],
  doing: [{ id: "3", title: "API Integration" }],
  done: [],
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const findColumn = (taskId) => {
    for (const key in tasks) {
      if (tasks[key].some((t) => t.id === taskId)) return key;
    }
    return null;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const from = findColumn(active.id);
    const to = over.id;

    if (!from || !to) return;
    if (from === to) return;

    const movedTask = tasks[from].find((t) => t.id === active.id);

    setTasks({
      ...tasks,
      [from]: tasks[from].filter((t) => t.id !== active.id),
      [to]: [...tasks[to], movedTask],
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: 20 }}>
        {Object.keys(tasks).map((col) => (
          <Column key={col} id={col} tasks={tasks[col]} />
        ))}
      </div>
    </DndContext>
  );
}

function Column({ id, tasks }) {
  return (
    <div
      style={{
        width: 250,
        minHeight: 300,
        padding: 10,
        background: "#f1f2f6",
        borderRadius: 8,
      }}
    >
      <h3 style={{ textTransform: "capitalize" }}>{id}</h3>

      {/* SortableContext for animation */}
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} />
        ))}
      </SortableContext>
    </div>
  );
}

function Task({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 10,
    marginBottom: 10,
    background: "white",
    borderRadius: 6,
    border: "1px solid #ccc",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {title}
    </div>
  );
}
