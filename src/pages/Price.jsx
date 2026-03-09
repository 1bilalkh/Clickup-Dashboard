import Price from "../component/price-component/Price-Component";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

function PricePage() {
  return (
    <>
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h4" fontWeight={700}>
          Excellent, Meaningull Pricing
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          bgcolor: "background.paper",
          borderRadius: 1,
          mb: 5,
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
      >
        <Price low="Low" price="$65" />
        <Box
          sx={{
            transform: {
              md: "scale(1.10)",
              sm: "scale(1.010)",
              xs: "scale(1.010)",
            },
            background: "linear-gradient(to right, #ffffff, #e0f7ff)",
            borderRadius: 4,
          }}
        >
          <Price low="Essential" price="$97" />
        </Box>
        <Price low="Pro" price="$297" />
      </Box>
    </>
  );
}

export default PricePage;
