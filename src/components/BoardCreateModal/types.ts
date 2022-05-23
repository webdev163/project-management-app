import { Dispatch, SetStateAction } from 'react';

export interface BoardCreateModalProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}
