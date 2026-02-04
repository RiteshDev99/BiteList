import { createSlice } from '@reduxjs/toolkit';
import { fetchFoods, fetchCategories } from './foodThunks';
import { FoodState } from './ types.ts';

const initialState: FoodState = {
  foods: [],
  status: 'idle',
  error: null,
  category: 'all',
  page: 1,
  hasMore: true,
  categories: [],
};

const foodSlice = createSlice({
  name: 'foodCatalog',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
      state.foods = [];
      state.hasMore = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch categories';
      })
      .addCase(fetchFoods.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.foods = action.payload.data;
        state.page += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed';
      });
  },
});

export const { setCategory } = foodSlice.actions;
export default foodSlice.reducer;
