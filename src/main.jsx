import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from './App.jsx'
import './App.css'
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CenteredBox from "./pages/inbox-component/CenteredBox"
import Toolbar from '@mui/material/Toolbar';


const theme = createTheme({
  typography: {
    fontFamily: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`,
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toolbar sx={{ height: {xs: '120px', sm: "70px"}  }} /> 
          <App sx={{ mt: { xs: "256px", sm: "64px" } }} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
