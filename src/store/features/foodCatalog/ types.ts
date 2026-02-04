export interface FoodItem {
  id: number;
  name: string;

  image?: string;
  rating?: number;
  category?: string;
  tags?: string[];

  description?: string;
  summary?: string;
  price?: number;
}

export interface FoodState {
  foods: FoodItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface FavoritesState {
  items: FoodItem[];
}
