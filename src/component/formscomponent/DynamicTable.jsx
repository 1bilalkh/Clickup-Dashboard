import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import TanStackDataTable from "./FormTable";

const API_URL = "http://localhost:5000";

export default function TableComponentComplete() {
 const {
  data: registrations = [],
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ["registrations"],
  queryFn: async () => {
    const response = await fetch(
      `${API_URL}/api/registrations`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch registrations");
    }

    return response.json();
  },
});

  if (isLoading) {
    return <Typography>Loading registrations...</Typography>;
  }

if (isError) {
  console.error("Registration query error:", error);

  return (
    <Box sx={{ mt: 1 }}>
      <Typography color="error">
        Failed to load registrations: {error?.message}
      </Typography>
    </Box>
  );
}

  return (
  <Box
    sx={{
      mt: 1,
      backgroundColor: "background.paper",
    }}
  >
    <Typography
      variant="h6"
      sx={{ mb: 2 }}
    >
      Registered Programs
    </Typography>

    <TanStackDataTable
      columns={[
        {
          accessorKey: "name",
          header: "Name",
          enableSorting: true,
        },
        {
          accessorKey: "program",
          header: "Program",
          enableSorting: true,
        },
        {
          accessorKey: "programType",
          header: "Type",
          enableSorting: true,
        },
        {
          accessorKey: "startDate",
          header: "Start Date",
          enableSorting: true,
          cell: (info) => {
            const value = info.getValue();

            return value
              ? new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "-";
          },
        },
        {
          accessorKey: "preferredTime",
          header: "Time",
          enableSorting: true,
        },
       {
  accessorKey: "status",
  header: "Status",
  enableSorting: true,

  cell: (info) => {
    const status = info.getValue();

    return (
      <Chip
        label={status}
        size="small"
        sx={{
          fontWeight: 600,
          borderRadius: 2,
        }}
        color={
          status === "Active"
            ? "success"
            : status === "Pending"
            ? "warning"
            : status === "Completed"
            ? "info"
            : "default"
        }
      />
    );
  },
},
      ]}
      data={registrations}
      sx={{
        borderRadius: 2,
      }}
    />
  </Box>
)}