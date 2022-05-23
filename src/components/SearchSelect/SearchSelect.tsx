import React, { FC } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectCallbackProps } from '~/types/board';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SearchSelect: FC<SelectCallbackProps> = props => {
  const [category, setCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    props.callback(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={1}>Task title</MenuItem>
          <MenuItem value={2}>Task number</MenuItem>
          {/* <MenuItem value={3}></MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchSelect;
