import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import CenteredBox from "../component/inbox-component/CenteredBox"
import Toolbar from '@mui/material/Toolbar';
import ThemeWrapper from "./ThemeWrapper.jsx";




const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
      <ThemeWrapper>
      <>
      <CssBaseline />
      <Toolbar sx={{ height: {xs: '120px',sm: "140px", md: "60px"}  }} /> 
          <App sx={{ mt: { xs: "256px", sm: "64px" } }} />
           </>
      </ThemeWrapper>
     
    </QueryClientProvider>
  </StrictMode>
)
