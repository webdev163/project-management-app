export interface ConfirmationModalProps {
  text: string;
  callback: (response: boolean) => void;
  isActive: boolean;
}
