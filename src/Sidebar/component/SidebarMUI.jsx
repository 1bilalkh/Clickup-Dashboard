import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import { IconButton, Tooltip } from "@mui/material";
import Sidebar from './Sidebar';


export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, }} role="presentation" onClick={toggleDrawer(false)}>
     
      <Sidebar />
      
    </Box>
  );

  return (
    <div>

        {/* <Tooltip title="showsidebar">
              <IconButton  onClick={() => setShowBox(prev => !prev)}>
                <FormatAlignLeftIcon />
              </IconButton>
            </Tooltip> */}
            <Tooltip>
                <IconButton onClick={toggleDrawer(true)}><FormatAlignLeftIcon /></IconButton>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
            </Tooltip>
    </div>
  );
}
