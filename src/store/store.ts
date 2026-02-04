import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './features/foodCatalog/foodSlice';

export const store = configureStore({
  reducer: {
    foodCatalog: foodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
