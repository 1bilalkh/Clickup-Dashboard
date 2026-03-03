import { Box, Typography } from "@mui/material";

export default function IconRowList({ items = [] }) {
  return (
    <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            p: 1,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#f3f4f6",
              boxShadow: 3,
              transform: "translateY(-2px)",
            },
          }}
          onClick={item.onClick}
        >
          {/* Left Icon */}
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "4px",
              backgroundColor: "#f0f0f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 1,
              color: "#747980",
              fill: "#747980",
            }}
          >
            {item.leftIcon}
          </Box>

          {/* Title */}
          <Typography variant="body2" sx={{ fontWeight: 600, mx: 1 }}>
            {item.title}
          </Typography>

          {/* Right Icon */}
          <Box
            sx={{
              marginLeft: "auto",
              color: "#747980",
            }}
          >
            {item.rightIcon}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
