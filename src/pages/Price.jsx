import Price from "../component/price-component/Price-Component";
import { Box, Typography } from "@mui/material";

function PricePage() {
  return (
    <>
      {/* ==========================================
          PAGE TITLE
      ========================================== */}

      <Box
        sx={{
          textAlign: "center",
          py: 5,
          
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            mb: 1,
            color: "text.primary",
          }}
        >
          Excellent, Meaningful Pricing
        </Typography>
      </Box>

      {/* ==========================================
          PRICING CARDS
      ========================================== */}

      <Box
        sx={{
          display: "flex",

          justifyContent: "space-between",
          
          alignItems: "stretch",

          gap: {
            xs: 2,
            sm: 2,
            md: 5,
          },

          mt: {
            xs: 0,
            sm: 0,
            md: 5,
          },

          mb: 5,

          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
        }}
      >
        {/* ========================================
            LOW
        ======================================== */}

        <Box
          sx={{
            flex: 1,
          }}
        >
          <Price
            low="Low"
            price="$65"
          />
        </Box>

        {/* ========================================
            ESSENTIAL - CENTER
        ======================================== */}

        <Box
          sx={{
            flex: 1,
            
            transform: {
              xs: "scale(1)",
              sm: "scale(1.01)",
              md: "scale(1.08)",
            },

            borderRadius: 4,

            // ======================================
            // LIGHT / DARK GRADIENT
            // ======================================

            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(to right, #151b26, #172a3d)"
                : "linear-gradient(to right, #ffffff, #e0f7ff)",

            // ======================================
            // KEEP CENTER CARD ABOVE OTHERS
            // ======================================

            position: "relative",

            zIndex: 1,
          }}
        >
          <Price
            low="Essential"
            price="$97"
          />
        </Box>

        {/* ========================================
            PRO
        ======================================== */}

        <Box
          sx={{
            flex: 1,
          }}
        >
          <Price
            low="Pro"
            price="$297"
          />
        </Box>
      </Box>
    </>
  );
}

export default PricePage;