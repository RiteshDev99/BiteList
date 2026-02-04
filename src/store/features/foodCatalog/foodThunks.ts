import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFoodsApi } from './foodApi';
import { FoodItem } from './ types.ts';

export const fetchFoods = createAsyncThunk<
  FoodItem[],
  void,
  { rejectValue: string }
>('foodCatalog/fetchFoods', async (_, { rejectWithValue }) => {
  try {
    return await fetchFoodsApi();
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to load foods');
  }
});
