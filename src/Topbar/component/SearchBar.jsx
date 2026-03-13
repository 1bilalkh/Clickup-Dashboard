import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <TextField
      placeholder="Ask AI anything about request, projects"
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
        border: "none",

        "& .MuiOutlinedInput-root": {
          borderRadius: "30px",
          height: 40,
          width: "100%",
          border: "none",
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
            borderWidth: 0,
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
