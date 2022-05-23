import { TaskData } from './api';

export interface BoardColumnProps {
  key: string;
  columnTitle: string;
  columnId: string;
  columnOrder: number;
  columnTasks: TaskData[];
  moveColumn: (draggedColumnId: string, hoveredColumnId: string) => void;
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
  columnToDropIdProp?: string;
  changeTaskColumn?: (draggedTaskId: string, draggedTaskColumnId: string, columnToDropId: string) => void;
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
