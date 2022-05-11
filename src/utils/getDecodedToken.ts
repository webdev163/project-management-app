import jwt_decode from 'jwt-decode';
import { getToken } from './getToken';
import { DecodedTokenData } from '~/types/api';

export const getDecodedToken = (): DecodedTokenData | null => {
  const token = getToken();
  return token ? (jwt_decode(token) as DecodedTokenData) : null;
};
