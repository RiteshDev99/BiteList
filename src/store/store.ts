import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './features/foodCatalog/foodSlice';
import favoritesReducer from './features/foodCatalog/favoritesSlice';

export const store = configureStore({
  reducer: {
    foodCatalog: foodReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
