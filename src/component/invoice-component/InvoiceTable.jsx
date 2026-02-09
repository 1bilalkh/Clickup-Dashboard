import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box
} from "@mui/material";

const InvoiceTable = ({ client, items }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <Box mt={2}>
      <Typography variant="subtitle1">
        {client.name} | {client.email}
      </Typography>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.qty}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.qty * item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography align="right" mt={2}>
        <strong>Grand Total: {subtotal}</strong>
      </Typography>
    </Box>
  );
};

export default InvoiceTable;
