import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <TextField
      placeholder="Search..."
      variant="outlined"
      size="small"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        borderRadius: "50px",          // Rounded corners
        "& .MuiOutlinedInput-root": {
          borderRadius: "50px",
          height: 36,        // Make input field round
          backgroundColor: "#fff",
          border: "1px solid #ccc",    // Grey border
          "&:hover": {
            borderColor: "#999",       // Darker grey on hover
          },
        },
      }}
    />
  );
}

export default SearchBar;
