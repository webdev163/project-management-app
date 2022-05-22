import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { useRef, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import SearchSelect from '../SearchSelect/SearchSelect';

export default function SearchForm() {
  return (
    <form>
      <TextField label="Enter text" variant="outlined"></TextField>
      <SearchSelect />
      <Button type="submit" variant="contained">
        Search
      </Button>
    </form>
  );
}
