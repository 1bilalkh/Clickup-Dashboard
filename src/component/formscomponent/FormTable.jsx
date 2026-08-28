import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Box,
  Checkbox,
  TextField,
  TablePagination,
  Typography,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function TanStackDataTable({
  columns,
  data,
  sx,
}) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      globalFilter,
      rowSelection,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,

    enableRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const rows = table.getRowModel().rows;

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>

      {/* TOP BAR */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {data.length} registered program
          {data.length !== 1 ? "s" : ""}
        </Typography>

        <TextField
          placeholder="Search programs..."
          size="small"
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
            setPage(0);
          }}
          sx={{
            width: {
              xs: "100%",
              sm: 260,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* TABLE */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          width: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          overflowX: "auto",
          overflowY: "hidden",
          ...sx,
        }}
      >
        <Table
          sx={{
            width: "100%",
            minWidth: 700,
          }}
        >

          {/* HEADER */}
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>

                {/* SELECT ALL */}
                <TableCell
                  padding="checkbox"
                  sx={{
                    backgroundColor: "action.hover",
                  }}
                >
                  <Checkbox
                    size="small"
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={
                      table.getToggleAllRowsSelectedHandler()
                    }
                  />
                </TableCell>

                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      backgroundColor: "action.hover",
                      fontWeight: 700,
                      color: "text.secondary",
                      whiteSpace: "nowrap",
                      py: 1.5,
                    }}
                  >
                    {header.column.getCanSort() ? (
                      <TableSortLabel
                        active={
                          header.column.getIsSorted() !== false
                        }
                        direction={
                          header.column.getIsSorted() || "asc"
                        }
                        onClick={
                          header.column.getToggleSortingHandler()
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableSortLabel>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          {/* BODY */}
          <TableBody>

            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >

                  {/* CHECKBOX */}
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      checked={row.getIsSelected()}
                      onChange={
                        row.getToggleSelectedHandler()
                      }
                    />
                  </TableCell>

                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{
                        py: 1.7,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  align="center"
                  sx={{
                    py: 6,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    No programs found
                  </Typography>
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 1,
        }}
      >
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={(event, newPage) => {
            setPage(newPage);
          }}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(
              parseInt(event.target.value, 10)
            );
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>

    </Box>
  );
}