import { TaskData } from './api';

export interface BoardColumnProps {
  key: string;
  columnTitle: string;
  columnId: string;
  columnOrder: number;
  columnTasks: TaskData[];
}

export interface BoardTaskProps {
  key: string;
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  setHoveredTaskId?: (setHoveredTaskId: string) => void;
}

export interface UpdateTask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
}

export interface ModalWindowFormOptions {
  type: string;
  btnTitle: string;
  placeholderText: string;
}

export interface ModalWindowFormProps {
  options: ModalWindowFormOptions;
  columnId: string;
}

export interface SetDataType {
  setData: (data: string) => void;
}

export interface CallBackProps {
  handleCloseModal: () => void;
}

export interface ModalWindowProps {
  options: ModalWindowFormProps;
  setData: SetDataType;
  handleCloseModal: CallBackProps;
}

export interface SelectCallbackProps {
  callback: (e: string) => void;
}

export interface SearchCallbackProps {
  searchState: boolean;
  callback: (e: string) => void;
  // handleResetBtn: (e: boolean) => void;
}
