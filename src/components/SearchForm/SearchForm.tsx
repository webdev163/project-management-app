import React, { FC } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
import { useRef } from 'react';
import { Button, TextField } from '@mui/material';
// import SearchSelect from '../SearchSelect/SearchSelect';
import { SearchCallbackProps } from '~/types/board';
import styles from './SearchForm.module.scss';

const SearchForm: FC<SearchCallbackProps> = props => {
  const htmlForm = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    props.callback(e.target[0].value);
  };

  // const handleSelectChange = (e: string) => {
  //   console.log(e.target);
  // };

  return (
    <form onSubmit={e => handleSubmit(e)} ref={htmlForm} className={styles.search_form_wrapper}>
      <TextField
        label="Task"
        placeholder="Enter task text"
        variant="outlined"
        size="small"
        sx={{ marginRight: '5px' }}
      ></TextField>
      {/* <SearchSelect callback={handleSelectChange} /> */}
      {/* {!props.searchState && }    */}
      <Button type="submit" variant="contained" sx={{ height: '40px' }}>
        Search
      </Button>
      {/* {props.searchState && <Button type="submit" variant="contained" sx={{ height: '40px' }} onClick={() => {
        props
        }}>
        Reset
      </Button>}     */}
    </form>
  );
};

export default SearchForm;
