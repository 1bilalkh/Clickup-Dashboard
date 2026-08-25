import Price from "../component/price-component/Price-Component";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

function PricePage() {
  return (
    <>
      <Box sx={{ textAlign: "center", py: 5, mb: '5' }}>
        <Typography variant="h4" fontWeight={700} sx={{mb: '5', pb: '5'}}>
          Excellent, Meaningull Pricing
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: {
            xs: 2,
            sm: 1,
            md: 1,
          },
          mt: {
            xs: 0,
            sm: 0,
            md: 5,
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
              md: "scale(1.20)",
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
