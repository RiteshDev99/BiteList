import axios from 'axios';
import { FoodItem } from './ types.ts';

const API_URL = 'https://api.jsonbin.io/v3/b/698184b543b1c97be96155bf';

export const fetchFoodsApi = async (): Promise<FoodItem[]> => {
  const res = await axios.get(`${API_URL}/latest`);
  return res.data.record?.data ?? [];
};

export const fetchCategoriesApi = async (): Promise<string[]> => {
  const foods = await fetchFoodsApi();
  return Array.from(new Set(foods.map(f => (f.category ?? 'Unknown').toString())));
};
