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
        borderRadius: "100px",          // Rounded corners
        "& .MuiOutlinedInput-root": {
          borderRadius: "100px",
          height: 30,        // Make input field round
          backgroundColor: "#fff",
           borderColor: "divider",    // Grey border
          "&:hover": {
            borderColor: "#f0f0f0",       // Darker grey on hover
          },
        },
      }}
    />
  );
}

export default SearchBar;
