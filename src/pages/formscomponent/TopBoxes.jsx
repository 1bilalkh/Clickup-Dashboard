import { Box, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

export default function InfoBoxes() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {/* Box 1 */}
      <Box
        sx={{
          flex: "1 1 300px",
          display: "flex",
          gap: 2,
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
      >
        <LocalShippingOutlinedIcon sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h6">Free Shipping</Typography>
          <Typography variant="body2" color="text.secondary">
            Free shipping on all orders over $100.
          </Typography>
        </Box>
      </Box>

      {/* Box 2 */}
      <Box
        sx={{
          flex: "1 1 300px",
          display: "flex",
          gap: 2,
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
      >
        <VerifiedUserOutlinedIcon sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h6">Secure Payment</Typography>
          <Typography variant="body2" color="text.secondary">
            Your payment information is processed securely.
          </Typography>
        </Box>
      </Box>

      {/* Box 3 */}
      <Box
        sx={{
          flex: "1 1 300px",
          display: "flex",
          gap: 2,
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
      >
        <SupportAgentOutlinedIcon sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h6">24/7 Support</Typography>
          <Typography variant="body2" color="text.secondary">
            We are here to help you anytime.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
