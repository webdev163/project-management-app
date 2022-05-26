import { Dispatch, SetStateAction } from 'react';

export interface TaskEditModalProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  columnId: string;
  taskId: string;
}
