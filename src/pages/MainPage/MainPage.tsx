import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { deleteBoard, getAllBoards } from '~/services/boards';
import { setBoards } from '~/store/reducers/boardSlice';
import { getBoard } from '~/services/boards';
import { setCurrentBoard } from '~/store/reducers/currentBoardSlice';
import { BoardData } from '~/types/api';
import { SearchTasksProps } from '~/types/mainRoute';
import { searchAllTasks } from '~/services/tasks';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '~/components/ConfirmationModal';
import Footer from '~/components/Footer';
import Button from '@mui/material/Button';
import { clearError } from '~/store/reducers/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import SearchForm from '~/components/SearchForm/SearchForm';
import { searchCategory } from '~/utils/constants';
import Loader from '~/components/Loader';
import BoardEditModal from '~/components/BoardEditModal';

import styles from './MainPage.module.scss';

const MainPage: FC = () => {
  const { boards } = useAppSelector(state => state.boards);
  const { isLogged, error } = useAppSelector(state => state.auth);
  const [countArr, setCountArr] = useState<BoardData[]>([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentBoardId, setCurrentBoardId] = useState('');

  const [pageState, setPageState] = useState({
    boardsOnPage: boards,
    state: false,
    boardOnDelete: '',
    isSearching: false,
    searchFlag: false,
    searchTasks: [] as SearchTasksProps[],
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const resetSearch = () => {
    setPageState(prev => {
      return {
        ...prev,
        state: false,
        boardOnDelete: '',
        isSearching: false,
        searchFlag: false,
        searchTasks: [] as SearchTasksProps[],
      };
    });
  };

  const onModalClick = async (resp: boolean) => {
    setPageState(prev => {
      return { ...prev, isSearching: true };
    });
    if (resp) {
      const boardId = pageState.boardOnDelete;
      const deleteResp = await deleteBoard(boardId);
      if (deleteResp?.status === 204 || deleteResp?.status === 200) {
        dispatch(setBoards(boards.filter(board => board.id !== boardId)));
      } else {
        alert('Something went wrong');
      }
    }
    setPageState(prev => {
      return { ...prev, state: false, boardOnDelete: '', isSearching: false };
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

  const searchFilter = (category: string, searchVal: string, tasksArray: SearchTasksProps[]) => {
    switch (category) {
      case searchCategory.TITLE:
        return tasksArray.filter(task => task.title.includes(searchVal));
      case searchCategory.DESCRIPTION:
        console.log('search descr', category, searchVal);
        return tasksArray.filter(task => task.description.includes(searchVal));
      case searchCategory.USER:
        return tasksArray.filter(task => task.userId.includes(searchVal));
      default:
        return tasksArray.filter(task => task.title.includes(searchVal));
    }
  };

  const handleSearch = async (searchCategory: string, searchVal: string) => {
    setPageState(prev => {
      return { ...prev, searchTasks: [], searchFlag: false, isSearching: true };
    });
    const tasksArr = await searchAllTasks();
    console.log('handleSearch tasksArr', tasksArr);
    if (Array.isArray(tasksArr?.data)) {
      const tasksModify = (tasksArr?.data as SearchTasksProps[]).map(task => {
        const boardTitle = boards.find(board => board.id === task.boardId);
        return { ...task, boardTitle: boardTitle?.title as string };
      });
      const tasksFilter = searchFilter(searchCategory, searchVal, tasksModify);

      setPageState(prev => {
        return { ...prev, searchFlag: true, searchTasks: [...tasksFilter], isSearching: false };
      });
    } else {
      setPageState(prev => {
        return { ...prev, searchFlag: true, isSearching: false };
      });
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
      setIsLoading(true);
      const getBoards = async (): Promise<void> => {
        const data = await getAllBoards();
        if (Array.isArray(data)) {
          dispatch(setBoards(data as BoardData[]));
          const arr = await Promise.all(data.map(async item => await getBoard(item.id)));
          const arrFilter = arr.filter(item => item !== undefined) as BoardData[];
          setCountArr(arrFilter ? [...arrFilter] : []);
        }
        setIsLoading(false);
      };
      getBoards();
    }
  }, [dispatch, isLogged, isEdited]);

  return (
    <div className="container">
      <div className={styles.mainPage}>
        <div className={styles.main_route_sidebar}>
          <SearchForm callback={handleSearch} searchState={pageState.searchFlag} />
          {pageState.isSearching && <Loader />}
          {isLoading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Loader />
            </div>
          )}
          {!isLoading && boards.length === 0 && <p className={styles.noBoardsText}>{t('MAIN_ROUTE.NO_BOARDS_TEXT')}</p>}
          {Array.isArray(boards) && !pageState.isSearching && !pageState.searchFlag && (
            <ul className={styles.list}>
              {boards.map((board: BoardData) => {
                return (
                  <li key={board.id} onClick={() => openBoard(board.id)} className={styles.boardWrapper}>
                    <NavLink to={`board/${board.id}`} className={styles.board}>
                      {countArr && (
                        <ul className={styles.list}>
                          <li className={styles.listItemTitle}>{board.title}</li>
                          <li className={styles.listItemDescr}>
                            {t('MAIN_ROUTE.BOARD_DESCR')}
                            {board.description.length > 70
                              ? board.description.substring(0, 67) + '...'
                              : board.description}
                          </li>
                          <li className={styles.listItem}>
                            {t('MAIN_ROUTE.COLUMNS_COUNT')} {tasksCount(board).columns}
                          </li>
                          <li className={styles.listItem}>
                            {t('MAIN_ROUTE.TASKS_COUNT')} {tasksCount(board).tasksNumber}
                          </li>
                        </ul>
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
                    <button
                      className={styles.editBtn}
                      onClick={() => {
                        setIsModalActive(true);
                        setCurrentBoardId(board.id);
                      }}
                    ></button>
                  </li>
                );
              })}
            </ul>
          )}

          {pageState.searchFlag && pageState.searchTasks.length !== 0 && (
            <>
              <ul className={styles.tasksWrapper}>
                {pageState.searchTasks.map((value, index) => {
                  return (
                    <NavLink
                      to={`board/${value.boardId}`}
                      key={value.boardId + index * 11}
                      className={styles.search_task}
                    >
                      {t('MAIN_ROUTE.BOARD_TITLE')}
                      {value.boardTitle}
                      <br />
                      {t('MAIN_ROUTE.TASK_TITLE')}
                      {value.title}
                    </NavLink>
                  );
                })}
              </ul>
              <div className={styles.backBtn_wrapper}>
                <Button variant="outlined" type="button" onClick={resetSearch}>
                  ← {t('BOARD.BUTTON_BACK')}
                </Button>
              </div>
            </>
          )}
          {pageState.searchFlag && pageState.searchTasks.length === 0 && (
            <div className={styles.search_no_tasks}>
              <div style={{ width: '100%', margin: '2rem 0 2rem 0' }}>{t('MAIN_ROUTE.NO_TASKS_FOUND')}</div>
              <div className={styles.back}>
                <Button variant="outlined" type="button" onClick={resetSearch}>
                  ← {t('BOARD.BUTTON_BACK')}
                </Button>
              </div>
            </div>
          )}
        </div>

        <ConfirmationModal callback={onModalClick} text={t('MAIN_ROUTE.DELETE_MESSAGE')} isActive={pageState.state} />
        <div className="footer-wrapper">
          <Footer />
        </div>
        <div style={{ height: '110px' }}></div>
        <ToastContainer />
        <BoardEditModal
          isActive={isModalActive}
          setIsActive={setIsModalActive}
          boardId={currentBoardId}
          setIsEdited={setIsEdited}
        />
      </div>
    </div>
  );
};

export default MainPage;
