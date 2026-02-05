import axios from 'axios';
import { FoodItem } from './types';

const API_URL = 'https://api.jsonbin.io/v3/b/698184b543b1c97be96155bf';

export const fetchFoodsApi = async (): Promise<FoodItem[]> => {
  const res = await axios.get(`${API_URL}/latest`);
  const raw: any[] = res.data.record?.data ?? [];
  return raw.map(item => ({
    id: item.id,
    name: item.title ?? item.name ?? `Item ${item.id}`,
    image: item.thumbNailImage ?? item.mainImage ?? item.image ?? undefined,
    rating: item.rating,
    category: item.category,
    tags: item.tags,
    description: item.description ?? item.summary,
    price: item.price,
  }));
};

export const fetchCategoriesApi = async (): Promise<string[]> => {
  const foods = await fetchFoodsApi();
  return Array.from(new Set(foods.map(f => (f.category ?? 'Unknown').toString())));
};
