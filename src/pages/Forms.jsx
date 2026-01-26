import Box from '@mui/material/Box';
import FormBoxes from "./formscomponent/TopBoxes"
import TableComponentComplete from "./formscomponent/DynamicTable.jsx"

function Forms() {

return (
    <>
      <FormBoxes />
      <Box sx={{ mt: 3 }}>
        <TableComponentComplete />
      </Box>
    </>
  );
}

  
export default Forms