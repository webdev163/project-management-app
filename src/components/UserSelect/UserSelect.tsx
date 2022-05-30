import React, { FC } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { UserCallbackProps } from '~/types/mainRoute';
import { useTranslation } from 'react-i18next';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const UserSelect: FC<UserCallbackProps> = props => {
  const [category, setCategory] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    props.callback(event.target.value as string);
  };

  const { t } = useTranslation();

  return (
    <Box sx={{ minWidth: 200, marginRight: 1 }}>
      <FormControl fullWidth size="small" sx={{ marginRight: '5px' }}>
        <Select value={category} sx={{ width: '250px' }} onChange={handleChange} displayEmpty>
          <MenuItem value="" disabled>
            {t('SEARCH_SELECT_OPTIONS.USER_SELECT')}
          </MenuItem>
          {props.userArray.length &&
            props.userArray.map(user => (
              <MenuItem value={user.id} key={user.id}>
                {user.login}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default UserSelect;
