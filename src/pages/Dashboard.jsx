import { useState } from "react";
import { Typography } from "@mui/material";
import ChooseTemplate from "../component/dashboard-component/ChooseTemplate"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DashboardBoxes from "../component/dashboard-component/DashboardModal"
import DifferentLength from "../component/dashboard-component/DashboardBigChart"
import PieChartWithCustomizedLabel from "../component/dashboard-component/Dashboard-pie.jsx"
import TableComponentComplete from "../component/formscomponent/DynamicTable.jsx"




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));





function Dashboard() {

  
  return (
    <>
      
      <Typography variant="h6">Choose a Dashboard template</Typography>
      <Typography variant="body2">Get started with a Dashboard template or create a custom Dashboard to fit your exact needs.</Typography>
      <br />
      <DashboardBoxes />
      <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid container spacing={2}>
         <Grid size={{ xs: 12, md: 8 }}>
          <Item><DifferentLength /></Item>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Item><PieChartWithCustomizedLabel /></Item>
        </Grid>
        
      </Grid>
    </Box>
      <Box sx={{ mt: 3 }}>
        <TableComponentComplete />
      </Box>
      
       
    </>
    
  )
}

export default Dashboard