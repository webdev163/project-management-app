import { ModalWindowFormOptions } from '~/types/board';

export const ENDPOINT_URL = 'https://webdev163-react-be-v2.herokuapp.com';

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

export const ItemTypes = {
  TASK: 'task',
  COLUMN: 'column',
  ITEM: 'item',
};
