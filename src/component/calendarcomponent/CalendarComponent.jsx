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

const meetings = [
  {
    title: "Client Meeting",
    date: "2026-03-10",
  },
  {
    title: "Project Discussion",
    date: "2026-03-14",
  },
  {
    title: "Team Standup",
    date: "2026-03-20",
  },
];

function CalendarPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <p>Loading calendar...</p>;
  if (error) return <p>Error loading events</p>;

  const today = new Date();

  const events = meetings.map((meeting) => {
    const meetingDate = new Date(meeting.date);

    return {
      ...meeting,
      color: meetingDate < today ? "#9e9e9e" : "#1976d2",
    };
  });

  return (
    <>
    <div className="owncalender">

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        dateClick={(info) => {
          alert("Clicked date: " + info.dateStr);
        }}
      />
    </div>
    </>
  );
}

export default CalendarPage;
