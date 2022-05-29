import React, { ChangeEvent, FC, useState } from 'react';
import { useRef } from 'react';
import { Button, TextField } from '@mui/material';
import SearchSelect from '../SearchSelect/SearchSelect';
import { searchCategory } from '~/utils/constants';
import { SearchCallbackProps } from '~/types/mainRoute';
import { getAllUsers } from '~/services/users';
import UserSelect from '../UserSelect/UserSelect';
import { UserData } from '~/types/api';
import styles from './SearchForm.module.scss';

const SearchForm: FC<SearchCallbackProps> = props => {
  const htmlForm = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<{
    value: string;
    users: UserData[];
    category: string;
    isUserCategory: boolean;
  }>({
    category: '',
    users: [],
    value: '',
    isUserCategory: false,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    props.callback(formState.category, formState.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => {
      return { ...prev, value: e.target.value };
    });
  };

  const handleSelectChange = async (e: string) => {
    console.log(e);
    if (e === searchCategory.USER) {
      const users = (await getAllUsers()) as UserData[];
      setFormState(prev => {
        return { ...prev, users: [...users], category: e, isUserCategory: true };
      });
    } else {
      setFormState(prev => {
        return { ...prev, category: e, isUserCategory: false };
      });
    }
  };

  const handleUserChange = async (e: string) => {
    setFormState(prev => {
      return { ...prev, value: e };
    });
  };

  return (
    <form onSubmit={e => handleSubmit(e)} ref={htmlForm} className={styles.search_form_wrapper}>
      {formState.isUserCategory ? (
        <UserSelect userArray={formState.users} callback={handleUserChange} />
      ) : (
        <TextField
          label="Task"
          placeholder="Enter task text"
          variant="outlined"
          size="small"
          sx={{ marginRight: '5px' }}
          onChange={handleInputChange}
        ></TextField>
      )}
      <SearchSelect callback={handleSelectChange} />
      <Button
        type="submit"
        variant="contained"
        sx={{ height: '40px', marginLeft: '5px' }}
        disabled={formState.category.length ? false : true}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
