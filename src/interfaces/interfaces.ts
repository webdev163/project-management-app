export interface BoardState {
  id: string;
  title: string;
}

export interface BoardResponse {
  boards: BoardState[];
  columns: ColumnState[];
  tasks: TaskState[];
}

export interface Test {
  id: number;
  title: string;
  items: TestItems[];
}

export interface TestItems {
  id: number;
  title: string;
}

export interface ColumnState {
  id: string;
  title: string;
  order: number;
}

export interface TaskState {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface QueryParams {
  userId: string;
  boardId: string;
  columns: ColumnState;
  columnId: string;
  tasks: TaskState;
  taskId: string;
}

export interface BoardColumnProps {
  key: string;
  title: string;
  id: string;
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
}

export interface GetAllTasksParams {
  boardId: string;
  columnId: string;
}

export interface ModalWindowFormOptions {
  type: string;
  btnTitle: string;
  placeholderText: string;
}

export interface ModalWindowFormProps {
  options: ModalWindowFormOptions;
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
