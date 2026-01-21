import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export default function DropdownModal() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
    <Box sx={{mt: 2}}>
    <FormControl sx={{
  m: 1,          // margin
  minWidth: 120, // minimum width
  width: '100%', // take full available width
}} size="small">
      <InputLabel id="demo-select-small-label">Team</InputLabel>
      <Select
        labelId="demo-select-small-label"
        value={age}
        label="Team Space"
        onChange={handleChange}
      >
        <MenuItem value="None">
          <em>Team</em>
        </MenuItem>
        <MenuItem value="10">Team 1</MenuItem>
        <MenuItem value="20">Team 2</MenuItem>
        <MenuItem value="30">Team 3</MenuItem>
      </Select>
    </FormControl>
    </Box>
    </>
  );
}
