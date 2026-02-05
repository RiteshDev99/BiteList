import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesState, FoodItem } from './types.ts';

const FAVORITES_KEY = 'BITE_LIST_FAVORITES';

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<FoodItem[]>) {
      state.items = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<FoodItem>) {
      const exists = state.items.find(i => i.id === action.payload.id);

      if (exists) {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }

      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
