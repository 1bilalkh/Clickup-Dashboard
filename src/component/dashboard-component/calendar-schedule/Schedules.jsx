import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent, Typography } from "@mui/material";

export default function Schedules() {
  return (
    <Card className="schedule" sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridFiveDay"

          views={{
            dayGridFiveDay: {
              type: "dayGrid",
              duration: { days: 5 }, // 👈 only 5 days
            }
          }}

          headerToolbar={{
            left: "prev,next",   // 👈 arrows
            center: "title",
            right: ""
          }}

          height="auto"
          selectable={true}

          events={[
            {
              title: "Meeting",
              start: new Date().toISOString().split("T")[0]
            },
            {
              title: "Client Call",
              start: new Date(
                new Date().setDate(new Date().getDate() + 2)
              )
                .toISOString()
                .split("T")[0]
            }
          ]}
        />
      </CardContent>
    </Card>
  );
}