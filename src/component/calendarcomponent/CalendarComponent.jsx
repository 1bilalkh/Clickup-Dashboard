import React from "react";
import { useQuery } from "@tanstack/react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

// Fetch events from API
const fetchEvents = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();

  // Convert API data into FullCalendar format
  return data.slice(0, 10).map((item) => ({
    id: item.id,
    title: item.title,
    date: "2025-01-15", // demo date (you would use real dates from API)
  }));
};

function CalendarPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <p>Loading calendar...</p>;
  if (error) return <p>Error loading events</p>;

  return (
    <div>
      <h2>My Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        { title: "Meeting", date: "2026-01-10" },
        { title: "Deadline", date: "2026-01-15" },
        { title: "Late Sitting", date: "2026-01-20" },
      ]}
      dateClick={(info) => {
        alert("Clicked date: " + info.dateStr);
      }}
      />
    </div>
  );
}

export default CalendarPage;
