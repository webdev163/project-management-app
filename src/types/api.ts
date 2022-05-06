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

export interface BoardData {
  id: string;
  title: string;
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
