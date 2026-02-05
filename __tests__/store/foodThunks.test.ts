import { configureStore } from '@reduxjs/toolkit';
import foodReducer from '../../src/store/features/foodCatalog/foodSlice';
import favoritesReducer from '../../src/store/features/foodCatalog/favoritesSlice';
import { fetchFoods, fetchCategories } from '../../src/store/features/foodCatalog/foodThunks';
import * as foodApi from '../../src/store/features/foodCatalog/foodApi';

jest.mock('../../src/store/features/foodCatalog/foodApi');

const mockedFoodApi = foodApi as jest.Mocked<typeof foodApi>;

describe('foodThunks', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        foodCatalog: foodReducer,
        favorites: favoritesReducer,
      },
    });
    jest.clearAllMocks();
  });

  describe('fetchCategories', () => {
    it('should dispatch pending and fulfilled actions on success', async () => {
      const mockCategories = ['Breakfast', 'Lunch', 'Dinner'];
      mockedFoodApi.fetchCategoriesApi.mockResolvedValueOnce(mockCategories);

      await store.dispatch(fetchCategories());

      const state = store.getState() as any;
      expect(state.foodCatalog.categories).toEqual(mockCategories);
      expect(state.foodCatalog.status).toBe('succeeded');
    });

    it('should dispatch pending and rejected actions on failure', async () => {
      mockedFoodApi.fetchCategoriesApi.mockRejectedValueOnce(new Error('API Error'));

      await store.dispatch(fetchCategories());

      const state = store.getState() as any;
      expect(state.foodCatalog.status).toBe('failed');
      expect(state.foodCatalog.error).toBe('API Error');
    });

    it('should set status to loading while fetching', async () => {
      let resolvePromise: (value: string[]) => void;
      const promise = new Promise<string[]>((resolve) => {
        resolvePromise = resolve;
      });
      mockedFoodApi.fetchCategoriesApi.mockReturnValueOnce(promise);

      const dispatchPromise = store.dispatch(fetchCategories());

      const intermediateState = store.getState() as any;
      expect(intermediateState.foodCatalog.status).toBe('loading');

      resolvePromise!(['Breakfast']);
      await dispatchPromise;
    });
  });

  describe('fetchFoods', () => {
    const mockFoods = [
      { id: 1, name: 'Pancakes', category: 'Breakfast', price: 9.99 },
      { id: 2, name: 'Salad', category: 'Lunch', price: 12.99 },
      { id: 3, name: 'Steak', category: 'Dinner', price: 24.99 },
    ];

    it('should fetch all foods when category is "all"', async () => {
      mockedFoodApi.fetchFoodsApi.mockResolvedValueOnce(mockFoods);

      await store.dispatch(fetchFoods({ category: 'all', page: 1 }));

      const state = store.getState() as any;
      expect(state.foodCatalog.foods).toEqual(mockFoods);
      expect(state.foodCatalog.status).toBe('succeeded');
    });

    it('should filter foods by category', async () => {
      mockedFoodApi.fetchFoodsApi.mockResolvedValueOnce(mockFoods);

      await store.dispatch(fetchFoods({ category: 'breakfast', page: 1 }));

      const state = store.getState() as any;
      expect(state.foodCatalog.foods).toHaveLength(1);
      expect(state.foodCatalog.foods[0].name).toBe('Pancakes');
    });

    it('should handle case-insensitive category filtering', async () => {
      mockedFoodApi.fetchFoodsApi.mockResolvedValueOnce(mockFoods);

      await store.dispatch(fetchFoods({ category: 'LUNCH', page: 1 }));

      const state = store.getState() as any;
      expect(state.foodCatalog.foods).toHaveLength(1);
      expect(state.foodCatalog.foods[0].name).toBe('Salad');
    });

    it('should set hasMore to false', async () => {
      mockedFoodApi.fetchFoodsApi.mockResolvedValueOnce(mockFoods);

      await store.dispatch(fetchFoods({ category: 'all', page: 1 }));

      const state = store.getState() as any;
      expect(state.foodCatalog.hasMore).toBe(false);
    });

    it('should increment page after successful fetch', async () => {
      mockedFoodApi.fetchFoodsApi.mockResolvedValueOnce(mockFoods);

      await store.dispatch(fetchFoods({ category: 'all', page: 1 }));

      const state = store.getState() as any;
      expect(state.foodCatalog.page).toBe(2);
    });

    it('should dispatch rejected action on API failure', async () => {
      mockedFoodApi.fetchFoodsApi.mockRejectedValueOnce(new Error('Network Error'));

      await store.dispatch(fetchFoods({ category: 'all', page: 1 }));

      const state = store.getState() as any;
      expect(state.foodCatalog.status).toBe('failed');
    });

    it('should return empty array when no foods match category', async () => {
      mockedFoodApi.fetchFoodsApi.mockResolvedValueOnce(mockFoods);

      await store.dispatch(fetchFoods({ category: 'dessert', page: 1 }));

      const state = store.getState() as any;
      expect(state.foodCatalog.foods).toEqual([]);
    });

    it('should handle empty API response', async () => {
      mockedFoodApi.fetchFoodsApi.mockResolvedValueOnce([]);

      await store.dispatch(fetchFoods({ category: 'all', page: 1 }));

      const state = store.getState() as any;
      expect(state.foodCatalog.foods).toEqual([]);
      expect(state.foodCatalog.status).toBe('succeeded');
    });
  });
});
