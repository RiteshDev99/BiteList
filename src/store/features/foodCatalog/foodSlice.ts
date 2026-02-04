import { createSlice } from '@reduxjs/toolkit';
import { fetchFoods } from './foodThunks';
import { FoodState } from './ types.ts';

const initialState: FoodState = {
  foods: [],
  status: 'idle',
  error: null,
};

const foodSlice = createSlice({
  name: 'foodCatalog',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFoods.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.foods = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

export default foodSlice.reducer;
