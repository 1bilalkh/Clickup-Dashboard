import { Box } from "@mui/material";

function PageGrid({
  children,
  wrap = true,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: wrap ? "wrap" : "nowrap",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
}

export default PageGrid;
