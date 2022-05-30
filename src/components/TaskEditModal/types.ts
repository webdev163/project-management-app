import { Dispatch, SetStateAction } from 'react';

export interface TaskEditModalProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  setTaskTitleProp: (title: string) => void;
  columnId: string;
  taskId: string;
}
