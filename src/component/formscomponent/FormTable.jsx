import React, { useState, useMemo } from "react";
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
  Button,
  TableFooter,
  TablePagination,
} from "@mui/material";

export default function TanStackDataTable({ columns, data, sx }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: false,
  });

  // Filtered and paginated data
  const filteredRows = table.getFilteredRowModel().rows;
  const paginatedRows = useMemo(
    () => filteredRows.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize),
    [filteredRows, pageIndex, pageSize]
  );

  return (
    <Box>
      {/* Global Search */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search..."
          variant="outlined"
          size="small"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper} sx={sx}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* Checkbox column */}
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      table.getSelectedRowModel().rows.length > 0 &&
                      table.getSelectedRowModel().rows.length < table.getRowModel().rows.length
                    }
                    checked={
                      table.getSelectedRowModel().rows.length === table.getRowModel().rows.length
                    }
                    onChange={(e) => {
                      table.toggleAllRowsSelected(e.target.checked);
                    }}
                  />
                </TableCell>

                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.column.getCanSort() ? (
                      <TableSortLabel
                        active={header.column.getIsSorted() !== false}
                        direction={header.column.getIsSorted() || "asc"}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableSortLabel>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                {/* Checkbox */}
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                  />
                </TableCell>

                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={pageIndex}
          onPageChange={(e, newPage) => setPageIndex(newPage)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => {
            setPageSize(parseInt(e.target.value, 10));
            setPageIndex(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>
    </Box>
  );
}
