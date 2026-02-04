import axios from 'axios';
import { FoodItem } from './ types.ts';

const API_URL = 'https://api.jsonbin.io/v3/b/698184b543b1c97be96155bf';

export const fetchFoodsApi = async (): Promise<FoodItem[]> => {
  const res = await axios.get(API_URL);
  return res.data.record;
};
