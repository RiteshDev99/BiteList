import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFoodsApi, fetchCategoriesApi } from './foodApi';

export const fetchCategories = createAsyncThunk('foodCatalog/fetchCategories', async () => {
  const cats = await fetchCategoriesApi();
  return cats;
});

export const fetchFoods = createAsyncThunk(
  'foodCatalog/fetchFoods',
  async ({ category, page: _page }: { category: string; page: number }) => {
    const allFoods = await fetchFoodsApi();

    const filtered =
      category === 'all'
        ? allFoods
        : allFoods.filter(
            (item: any) => item.category?.toLowerCase() === category.toLowerCase(),
          );

    return {
      data: filtered,
      hasMore: false,
    };
  },
);
