import { UserData } from './api';

export interface SelectCallbackProps {
  callback: (e: string) => void;
}

export interface SearchCallbackProps {
  searchState: boolean;
  callback: (category: string, value: string) => void;
  // handleResetBtn: (e: boolean) => void;
}

export type SearchTasksProps = {
  boardId: string;
  columnId: string;
  description: string;
  id: string;
  order: number;
  title: string;
  user: TaskUser;
  userId: string;
  boardTitle?: string;
};

type TaskUser = {
  name: string;
};

export type SearchFormValueProps = {
  searchText: string;
  searchCategory: string;
};

export interface UserCallbackProps {
  userArray: UserData[];
  callback: (value: string) => void;
}
