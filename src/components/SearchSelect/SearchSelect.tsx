import React, { FC } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectCallbackProps } from '~/types/mainRoute';
import { searchCategory } from '~/utils/constants';
import { useTranslation } from 'react-i18next';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SearchSelect: FC<SelectCallbackProps> = props => {
  const [category, setCategory] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    props.callback(event.target.value as string);
  };

  const { t } = useTranslation();

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth size="small" sx={{ marginRight: '5px' }}>
        <InputLabel id="demo-simple-select-label">{t('SEARCH_SELECT_OPTIONS.CATEGORY')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={searchCategory.TITLE}> {t('SEARCH_SELECT_OPTIONS.SELECT_TITLE')}</MenuItem>
          <MenuItem value={searchCategory.DESCRIPTION}> {t('SEARCH_SELECT_OPTIONS.SELECT_DESCRIPTION')}</MenuItem>
          <MenuItem value={searchCategory.USER}> {t('SEARCH_SELECT_OPTIONS.SELECT_USER')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchSelect;
