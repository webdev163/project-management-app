import { store } from '~/store';

export const getToken = () => {
  // const state = store.getState();
  // const token = state.auth.token;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MWFlZTIxNC0yZTA3LTQ2NTItOTczMy01ZjRkZDY4Mzk3MGQiLCJsb2dpbiI6ImFueWFjdWJlZCIsImlhdCI6MTY1MTY3MTExNX0.wGWhFFlAeZk_NaASIXt_W5wb7c75myILJiQmHxVZsb4';
  return token;
};
