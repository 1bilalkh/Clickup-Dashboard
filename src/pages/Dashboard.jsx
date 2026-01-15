import { Typography } from "@mui/material";
import ChooseTemplate from "./dashboard-component/ChooseTemplate"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DashboardBoxes from "./dashboard-component/DashboardModal"


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
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
      
    </>
    
  )
}

export default Dashboard