import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './features/foodCatalog/foodSlice.ts';
import favoritesReducer from './features/foodCatalog/  favoritesSlice.ts';

export const store = configureStore({
  reducer: {
    foodCatalog: foodReducer,
    favorites: favoritesReducer,
  },
});
