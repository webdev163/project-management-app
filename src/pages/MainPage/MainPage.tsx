import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { increment, decrement, incrementByAmount } from '~/store/reducers/counterSlice';

const MainPage: FC = () => {
  const { counter } = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(increment());
    dispatch(decrement());
    dispatch(incrementByAmount(7));
  }, [dispatch]);

  return (
    <div>
      <h1>Main Page</h1>
      <p>Counter - {counter}</p>
    </div>
  );
};

export default MainPage;
