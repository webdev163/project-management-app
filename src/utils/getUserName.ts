import { getUser } from '~/services/users';
import { UserData } from '~/types/api';

export const getUserName = async (userId: string) => {
  const userData = (await getUser(userId)) as UserData;
  return userData.name;
};
