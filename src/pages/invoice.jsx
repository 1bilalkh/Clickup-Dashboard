import React, { useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button
} from "@mui/material";
import InvoiceForm from "../component/invoice-component/InvoiceForm";
import InvoiceTable from "../component/invoice-component/InvoiceTable";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const invoiceRef = useRef();

  const [client, setClient] = useState({
    name: "",
    email: "",
    address: ""
  });

  const [items, setItems] = useState([]);

  const downloadPDF = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("invoice.pdf");
  };

  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              
              <Grid size={6}>
                   <InvoiceForm
                client={client}
                setClient={setClient}
                items={items}
                setItems={setItems}
              />
              </Grid>
              <Grid size={6}>
                  <Card ref={invoiceRef}>
                <CardContent>
                  <Typography variant="h6">Invoice Preview</Typography>
                  <InvoiceTable client={client} items={items} />
                </CardContent>
              </Card>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={downloadPDF}
              >
                Download PDF
              </Button>
              </Grid>
           </Grid>
        </Box>
    </>
  );
};

export default Invoice;
