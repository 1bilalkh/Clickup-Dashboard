import Box from '@mui/material/Box';
import FormBoxes from "../component/formscomponent/TopBoxes"
import TableComponentComplete from "../component/formscomponent/DynamicTable.jsx"

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