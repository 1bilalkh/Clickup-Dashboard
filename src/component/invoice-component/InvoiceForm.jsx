import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Stack
} from "@mui/material";
import { useState } from "react";

const InvoiceForm = ({ client, setClient, items, setItems }) => {
  const [item, setItem] = useState({ name: "", qty: 1, price: 0 });

  const addItem = () => {
    setItems([...items, item]);
    setItem({ name: "", qty: 1, price: 0 });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Client Details</Typography>

        <Stack spacing={2} mt={2}>
          <TextField
            label="Client Name"
            value={client.name}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
          />
          <TextField
            label="Email"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
          />
          <TextField
            label="Address"
            value={client.address}
            onChange={(e) => setClient({ ...client, address: e.target.value })}
          />

          <Typography variant="h6">Add Item</Typography>

          <TextField
            label="Item Name"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
          />
          <TextField
            label="Quantity"
            type="number"
            value={item.qty}
            onChange={(e) => setItem({ ...item, qty: +e.target.value })}
          />
          <TextField
            label="Price"
            type="number"
            value={item.price}
            onChange={(e) => setItem({ ...item, price: +e.target.value })}
          />

          <Button variant="outlined" onClick={addItem}>
            Add Item
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
