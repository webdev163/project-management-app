import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { deleteBoard, getAllBoards } from '~/services/boards';
import { setBoards } from '~/store/reducers/boardSlice';
import { getBoard } from '~/services/boards';
import { setCurrentBoard } from '~/store/reducers/currentBoardSlice';
import Loader from '~/components/Loader';
import { BoardData } from '~/types/api';
import { TaskData } from '~/types/api';
import { getAllTasks } from '~/services/tasks';
import { ColumnData } from '~/types/api';
import { getAllColumns } from '~/services/columns';
import { List, ListItem } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '~/components/ConfirmationModal';
import Footer from '~/components/Footer';
import { clearError } from '~/store/reducers/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import SearchForm from '~/components/SearchForm/SearchForm';
import styles from './MainPage.module.scss';

const MainPage: FC = () => {
  const { boards } = useAppSelector(state => state.boards);
  const { isLogged, error } = useAppSelector(state => state.auth);
  const [countArr, setCountArr] = useState<BoardData[]>([]);

  const [pageState, setPageState] = useState({
    boardsOnPage: boards,
    state: false,
    boardOnDelete: '',
    isLoading: false,
    searchFlag: false,
    searchTasks: [] as TaskData[],
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onModalClick = async (resp: boolean) => {
    setPageState(prev => {
      return { ...prev, isLoading: true };
    });
    if (resp) {
      const boardId = pageState.boardOnDelete;
      const deleteResp = await deleteBoard(boardId);
      // console.log('deleteResp >>>', deleteResp);
      if (deleteResp?.status === 204 || deleteResp?.status === 200) {
        dispatch(setBoards(boards.filter(board => board.id !== boardId)));
      } else {
        alert('Something went wrong');
      }
    }
    setPageState(prev => {
      return { ...prev, state: false, boardOnDelete: '', isLoading: false };
    });
  };

  const openBoard = (boardId: string): void => {
    dispatch(setCurrentBoard(boards.find(board => board.id === boardId) as BoardData));
  };

  const tasksCount = (board: BoardData) => {
    const boardToCount = countArr.find(item => board.id === item.id) as BoardData;
    const columns = boardToCount?.columns?.length || 0;
    let tasksNumber = 0;
    columns
      ? boardToCount.columns?.forEach(item => {
          if (item.tasks) {
            tasksNumber += item.tasks.length;
          }
        })
      : 0;
    return { columns, tasksNumber };
  };

  // const handleResetBtn = () => {
  //   setPageState(prev => {
  //     return { ...prev, searchFlag: false, searchTasks: [] };
  //   });
  // };

  const handleSearch = async (searchVal: string) => {
    // console.log('handleSearch', searchVal);
    // console.log('search', boards);
    setPageState(prev => {
      return { ...prev, searchTasks: [], searchFlag: false };
    });
    const columns = await Promise.all(
      boards.map(async item => {
        const col = await getAllColumns(item.id);
        return { boardId: item.id, columns: col };
      }),
    );
    // console.log('handleSearch', columns);
    const columnsFilter = columns.filter(item => {
      if ((item.columns as ColumnData[]).length) {
        return item;
      }
    });
    // console.log('handleSearch columnsFilter', columnsFilter);
    const simpleColumnsObj = columnsFilter
      .map(item => {
        if ((item.columns as ColumnData[]).length === 1) {
          return { boardId: item.boardId, column: (item.columns as ColumnData[])[0] };
        } else {
          const arrObj = (item.columns as ColumnData[]).map(value => {
            return { boardId: item.boardId, column: value };
          });
          return arrObj;
        }
      })
      .flat();
    // console.log('handleSearch simpleColumnsObj', simpleColumnsObj);
    const tasksArr = (
      await Promise.all(simpleColumnsObj.map(async item => await getAllTasks(item.boardId, item.column.id)))
    ).flat();
    // console.log('handleSearch tasksArr', tasksArr);
    const tasksArrFilter = tasksArr.filter(task => (task as TaskData).title.indexOf(searchVal) !== -1) as TaskData[];
    // console.log('handleSearch tasksArrFilter', tasksArrFilter);
    if (tasksArrFilter.length) {
      setPageState(prev => {
        return { ...prev, searchFlag: true, searchTasks: [...tasksArrFilter] };
      });
    } else {
      setPageState(prev => {
        return { ...prev, searchFlag: true };
      });
      console.log('no such tasks');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(clearError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isLogged) {
      const getBoards = async (): Promise<void> => {
        const data = await getAllBoards();
        // console.log(data);
        if (Array.isArray(data)) {
          dispatch(setBoards(data as BoardData[]));
          const arr = await Promise.all(data.map(async item => await getBoard(item.id)));
          // const tasksData = await Promise.all(data.map(async item => await getBoard(item.id)));
          const arrFilter = arr.filter(item => item !== undefined) as BoardData[];
          setCountArr(arrFilter ? [...arrFilter] : []);
        }
      };
      getBoards();
    }
  }, [dispatch, isLogged]);

  return (
    <div className={styles.mainPage}>
      <div className={styles.main_route_sidebar}>
        <SearchForm callback={handleSearch} searchState={pageState.searchFlag} />
        {/* <NavLink to="/board" className={`${styles.board} ${styles.boardDefaulted}`}>
          <p>{t('MAIN_ROUTE.CREATE_BOARD')}</p>
        </NavLink> */}
        {Array.isArray(boards) && !pageState.searchFlag && (
          <List>
            {boards.map((board: BoardData) => {
              // console.log('render')
              return (
                <ListItem key={board.id} onClick={() => openBoard(board.id)} className={styles.boardWrapper}>
                  <NavLink to={`board/${board.id}`} className={styles.board}>
                    {countArr && (
                      <List>
                        <ListItem>{board.title}</ListItem>
                        <ListItem>
                          {t('MAIN_ROUTE.COLUMNS_COUNT')} {tasksCount(board).columns}
                        </ListItem>
                        <ListItem>
                          {t('MAIN_ROUTE.TASKS_COUNT')} {tasksCount(board).tasksNumber}
                        </ListItem>
                      </List>
                    )}
                  </NavLink>
                  <div className={styles.deleteIcon_wrapper}>
                    <BackspaceIcon
                      color="error"
                      className={styles.deleteIcon}
                      onClick={() =>
                        setPageState(prev => {
                          return { ...prev, state: true, boardOnDelete: board.id };
                        })
                      }
                    />
                  </div>
                </ListItem>
              );
            })}
          </List>
        )}
        {pageState.searchFlag && pageState.searchTasks.length !== 0 && (
          <List>
            {pageState.searchTasks.map((value, index) => (
              <NavLink to="board" className={styles.search_task} key={`${value.title + index}`}>
                <ListItem onClick={() => openBoard(value.boardId)}>Task title: {value.title}</ListItem>
              </NavLink>
            ))}
          </List>
        )}
        {pageState.searchFlag && pageState.searchTasks.length === 0 && (
          <div className={styles.search_no_tasks}>
            <div>There is no tasks with such title...</div>
          </div>
        )}
      </div>

      <ConfirmationModal callback={onModalClick} text={t('MAIN_ROUTE.DELETE_MESSAGE')} isActive={pageState.state} />
      <div style={{ opacity: pageState.isLoading ? 1 : 0 }}>
        <Loader />
      </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainPage;
