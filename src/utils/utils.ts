import { ModalWindowFormOptions } from '~/interfaces/interfaces';

export const handleUserKeyUp = (event: { code: string }): void => {
  if (event.code === 'Enter') {
    console.log();
  }
};

export const handleFocus = (event: React.ChangeEvent<HTMLTextAreaElement>) => event.target.select();

export const columnOptions: ModalWindowFormOptions = {
  type: 'column',
  btnTitle: 'Добавить колонку',
  placeholderText: 'Ввести заголовок колонки',
};

export const taskOptions: ModalWindowFormOptions = {
  type: 'task',
  btnTitle: 'Добавить таску',
  placeholderText: 'Ввести заголовок для этой таски',
};
