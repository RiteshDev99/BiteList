import foodReducer, { setCategory } from '../../src/store/features/foodCatalog/foodSlice';
import { fetchFoods, fetchCategories } from '../../src/store/features/foodCatalog/foodThunks';
import { FoodState } from '../../src/store/features/foodCatalog/types';

describe('foodSlice', () => {
  const initialState: FoodState = {
    foods: [],
    status: 'idle',
    error: null,
    category: 'all',
    page: 1,
    hasMore: true,
    categories: [],
  };

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(foodReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setCategory', () => {
      const actual = foodReducer(initialState, setCategory('breakfast'));

      expect(actual.category).toBe('breakfast');
      expect(actual.page).toBe(1);
      expect(actual.foods).toEqual([]);
      expect(actual.hasMore).toBe(true);
    });

    it('should reset foods and page when category changes', () => {
      const stateWithFoods: FoodState = {
        ...initialState,
        foods: [{ id: 1, name: 'Test Food' }],
        page: 3,
        hasMore: false,
      };

      const actual = foodReducer(stateWithFoods, setCategory('lunch'));

      expect(actual.category).toBe('lunch');
      expect(actual.page).toBe(1);
      expect(actual.foods).toEqual([]);
      expect(actual.hasMore).toBe(true);
    });
  });

  describe('extraReducers - fetchCategories', () => {
    it('should set status to loading when fetchCategories is pending', () => {
      const action = { type: fetchCategories.pending.type };
      const actual = foodReducer(initialState, action);

      expect(actual.status).toBe('loading');
    });

    it('should set categories when fetchCategories is fulfilled', () => {
      const categories = ['Breakfast', 'Lunch', 'Dinner'];
      const action = { type: fetchCategories.fulfilled.type, payload: categories };
      const actual = foodReducer(initialState, action);

      expect(actual.status).toBe('succeeded');
      expect(actual.categories).toEqual(categories);
    });

    it('should set error when fetchCategories is rejected', () => {
      const action = {
        type: fetchCategories.rejected.type,
        error: { message: 'Network error' }
      };
      const actual = foodReducer(initialState, action);

      expect(actual.status).toBe('failed');
      expect(actual.error).toBe('Network error');
    });

    it('should set default error message when fetchCategories is rejected without message', () => {
      const action = {
        type: fetchCategories.rejected.type,
        error: {}
      };
      const actual = foodReducer(initialState, action);

      expect(actual.status).toBe('failed');
      expect(actual.error).toBe('Failed to fetch categories');
    });
  });

  describe('extraReducers - fetchFoods', () => {
    it('should set status to loading when fetchFoods is pending', () => {
      const action = { type: fetchFoods.pending.type };
      const actual = foodReducer(initialState, action);

      expect(actual.status).toBe('loading');
    });

    it('should set foods when fetchFoods is fulfilled', () => {
      const foods = [
        { id: 1, name: 'Food 1' },
        { id: 2, name: 'Food 2' },
      ];
      const action = {
        type: fetchFoods.fulfilled.type,
        payload: { data: foods, hasMore: false }
      };
      const actual = foodReducer(initialState, action);

      expect(actual.status).toBe('succeeded');
      expect(actual.foods).toEqual(foods);
      expect(actual.page).toBe(2);
      expect(actual.hasMore).toBe(false);
    });

    it('should increment page when fetchFoods is fulfilled', () => {
      const stateWithPage: FoodState = {
        ...initialState,
        page: 2,
      };
      const action = {
        type: fetchFoods.fulfilled.type,
        payload: { data: [], hasMore: true }
      };
      const actual = foodReducer(stateWithPage, action);

      expect(actual.page).toBe(3);
    });

    it('should set error when fetchFoods is rejected', () => {
      const action = {
        type: fetchFoods.rejected.type,
        error: { message: 'API error' }
      };
      const actual = foodReducer(initialState, action);

      expect(actual.status).toBe('failed');
      expect(actual.error).toBe('API error');
    });

    it('should set default error message when fetchFoods is rejected without message', () => {
      const action = {
        type: fetchFoods.rejected.type,
        error: {}
      };
      const actual = foodReducer(initialState, action);

      expect(actual.status).toBe('failed');
      expect(actual.error).toBe('Failed');
    });

    it('should update hasMore based on payload', () => {
      const action = {
        type: fetchFoods.fulfilled.type,
        payload: { data: [], hasMore: true }
      };
      const actual = foodReducer(initialState, action);

      expect(actual.hasMore).toBe(true);
    });
  });
});
