import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import ThemeContext from "./ThemeContext";

export default function ThemeWrapper({ children }) {
  const [mode, setMode] = React.useState("light");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode,
            primary: {
                main: mode === "light" ? "#000000" : "#020202",
            },
         },
        typography: {
          fontFamily: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`,
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
