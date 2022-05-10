import { store } from '~/store';

export const getToken = () => {
  const state = store.getState();
  const token = state.auth.token;
  return token;
};
