import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <TextField
      placeholder="Search items,categories..."
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
  borderRadius: "100px",

  "& .MuiOutlinedInput-root": {
    borderRadius: "100px",
    height: 30,
    bgcolor: "background.paper",

    // normal
    "& fieldset": {
      borderColor: "divider",
    },

    // hover
    "&:hover fieldset": {
      borderColor: "text.primary",
    },

    // focus
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
      borderWidth: 2,
    },
  },

  "& input::placeholder": {
    color: "text.secondary",
    opacity: 1,
  },
}}
    />
  );
}

export default SearchBar;
