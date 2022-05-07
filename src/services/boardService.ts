import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BoardState, GetAllTasksParams, TaskState } from '~/interfaces/interfaces';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MWFlZTIxNC0yZTA3LTQ2NTItOTczMy01ZjRkZDY4Mzk3MGQiLCJsb2dpbiI6ImFueWFjdWJlZCIsImlhdCI6MTY1MTY3MTExNX0.wGWhFFlAeZk_NaASIXt_W5wb7c75myILJiQmHxVZsb4';

export const dataAPI = createApi({
  reducerPath: 'dataAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://webdev163-react-be.herokuapp.com',
  }),
  endpoints: build => ({
    getAllBoards: build.query({
      query: () => ({
        url: '/boards',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    createBoard: build.mutation<BoardState, BoardState>({
      query: (board: BoardState) => ({
        url: '/boards',
        method: 'POST',
        body: board,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getColumns: build.query({
      query: (boardId: string) => ({
        url: `/boards/${boardId}/columns`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getTasks: build.query<TaskState[], GetAllTasksParams>({
      query: (getTasksParams: GetAllTasksParams) => ({
        url: `/boards/${getTasksParams.boardId}/columns/${getTasksParams.columnId}/tasks`,
        params: {
          boardId: getTasksParams.boardId,
          columnId: getTasksParams.columnId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export default dataAPI;
