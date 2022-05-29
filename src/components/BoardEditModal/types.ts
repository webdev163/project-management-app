import { Dispatch, SetStateAction } from 'react';

export interface BoardEditModalProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  setIsEdited: Dispatch<SetStateAction<boolean>>;
}
