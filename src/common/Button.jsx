import React from "react";
import { Button } from "@mui/material";

export default function CustomButton({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  sx = {},
  ...props
}) {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      sx={{
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        px: 3,
        py: 1,
        ...sx, // allow custom styling override

        background: "linear-gradient(45deg, #2196F3 30%, #0D47A1 90%)",
        color: "#fff",

        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        "&:hover": {
          background: "linear-gradient(45deg, #1E88E5 30%, #08306B 90%)",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
