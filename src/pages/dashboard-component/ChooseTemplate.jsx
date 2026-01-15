import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

function ChooseTemplate({icon,title,text}) {
  return (
    <>
        
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start"
                    flexDirection={{ xs: "column", sm: "column" }}
                >
                
                <Box
                  mb={1}
                  sx={{
                    bgcolor: "#e3f2fd",
                    p: 2,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
          >
      <DashboardIcon sx={{ fontSize: 20 }} />
    </Box>
      <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
          {title}
      </Typography>
      <Typography variant="body2">
      {text}
      </Typography>
      </Box>

                
            </CardContent>
                

        
    </>
  )
}

export default ChooseTemplate