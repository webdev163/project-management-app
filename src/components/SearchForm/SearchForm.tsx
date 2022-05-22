import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { useRef, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import SearchSelect from '../SearchSelect/SearchSelect';

export default function SearchForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  const handleSelectChange = (e: string) => {
    console.log(e);
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <TextField label="Enter text" variant="outlined"></TextField>
      <SearchSelect callback={handleSelectChange} />
      <Button type="submit" variant="contained">
        Search
      </Button>
    </form>
  );
}
