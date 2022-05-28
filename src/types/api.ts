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

export interface UpdateRequest {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface UpdateResponse {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string;
  login: string;
}

export interface BoardData {
  id: string;
  title: string;
  description: string;
  columns?: ColumnData[];
}

export interface ColumnData {
  id: string;
  title: string;
  order: number;
  tasks?: TaskData[];
}

export interface TaskData {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: unknown;
}

export interface UpdateColumnTasks {
  columnId: string;
  tasks: TaskData[];
}

export interface UpdateTask {
  columnId: string;
  taskId: string;
}

export interface DecodedTokenData {
  userId: string;
  login: string;
  iat: number;
}

export interface AxiosErrorData {
  message: string;
  statusCode: number;
}

export enum ServerResponseEn {
  WRONG_LOGIN_PASSWORD = 'Incorrect username or password, please check your input',
  USER_ALREADY_EXISTS = 'User with this login is already registered',
  UNKNOWN_ERROR = 'Unknown error, please try again later',
  TOKEN_EXPIRED = 'Your session has expired, please login again',
}

export enum ServerResponseRu {
  WRONG_LOGIN_PASSWORD = 'Неправильный логин или пароль, проверьте правильность ввода',
  USER_ALREADY_EXISTS = 'Пользователь с таким логином уже зарегистрирован',
  UNKNOWN_ERROR = 'Неизвестная ошибка, пожалуйста повторите запрос позднее',
  TOKEN_EXPIRED = 'Ваша сессия устарела, пожалуйста войдите заново',
}
