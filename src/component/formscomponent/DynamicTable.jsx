import React from "react";
import TanStackDataTable from "./FormTable";
import { Box, Button } from "@mui/material";

export default function TableComponentComplete() {
  const data = [
    { name: "John", email: "john@example.com", role: "Admin" },
    { name: "Sarah", email: "sarah@example.com", role: "User" },
    { name: "Mike", email: "mike@example.com", role: "Manager" },
    { name: "Anna", email: "anna@example.com", role: "User" },
    { name: "Paul", email: "paul@example.com", role: "Admin" },
    { name: "Tom", email: "tom@example.com", role: "Manager" },
  ];

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => alert(`Edit ${row.original.name}`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ mt: 5 }} className="tableown">
      <TanStackDataTable columns={columns} data={data} sx={{ borderRadius: 2 }} />
    </Box>
  );
}
