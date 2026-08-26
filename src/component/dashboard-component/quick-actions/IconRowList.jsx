import { Box, Typography } from "@mui/material";

export default function IconRowList({ items = [] }) {
  return (
    <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
      {items.map((item, index) => (
        <Box
          key={index}
          sx={(theme) => ({
            flex: 1,
            display: "flex",
            alignItems: "center",
            p: 1,
            borderRadius: 2,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(to right, rgb(255, 255, 255), rgb(224, 247, 255))"
                : "linear-gradient(to right, rgb(18, 18, 18), rgb(20, 45, 55))",
            color: "text.primary",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "background.primary",
              boxShadow: 3,
              color: "text.primary",
              transform: "translateY(-2px)",
            },
          })}
          onClick={item.onClick}
        >
          {/* Left Icon */}
          <Box
            sx={(theme) => ({
  width: 30,
  height: 30,
  borderRadius: "4px",

  backgroundColor:
    theme.palette.mode === "light"
      ? "#f0f0f2"
      : "#2a2a2a",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mr: 1,

  fill:
    theme.palette.mode === "light"
      ? "#ffffff"
      : "#000",

  color: "text.secondary",

  "&:hover": {
    color: "text.primary",
  },
})}
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
