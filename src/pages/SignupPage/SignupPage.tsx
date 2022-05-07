import React, { FC, useState } from 'react';
import { useAppDispatch } from '~/hooks/redux';
import { signUp } from '~/store/reducers/authSlice';

const SignupPage: FC = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const updateName = (name: string) => {
    setName(name);
  };

  const updateLogin = (name: string) => {
    setLogin(name);
  };

  const updatePassword = (password: string) => {
    setPassword(password);
  };

  const onSubmit = () => {
    dispatch(
      signUp({
        name,
        login,
        password,
      }),
    );
  };

  return (
    <div>
      <p>Зарегистрироваться:</p>
      <input type="text" onChange={e => updateName(e.target.value)} />
      <input type="text" onChange={e => updateLogin(e.target.value)} />
      <input type="password" onChange={e => updatePassword(e.target.value)} />
      <button type="submit" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SignupPage;
