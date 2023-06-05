import { Action, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import appReducer from './reducers/appReducer';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
