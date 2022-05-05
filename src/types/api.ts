export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignUpRequest {
  name: string;
  login: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string;
  login: string;
}
