import { configureStore } from '@reduxjs/toolkit';
import foodReducer from '../../src/store/features/foodCatalog/foodSlice';
import favoritesReducer from '../../src/store/features/foodCatalog/favoritesSlice';
import { store, RootState, AppDispatch } from '../../src/store/store';

describe('Redux Store', () => {
  it('should be properly configured with all reducers', () => {
    const state = store.getState();

    expect(state).toHaveProperty('foodCatalog');
    expect(state).toHaveProperty('favorites');
  });

  it('should have correct initial foodCatalog state', () => {
    const state = store.getState();

    expect(state.foodCatalog).toEqual({
      foods: [],
      status: 'idle',
      error: null,
      category: 'all',
      page: 1,
      hasMore: true,
      categories: [],
    });
  });

  it('should have correct initial favorites state', () => {
    const state = store.getState();

    expect(state.favorites).toEqual({
      items: [],
    });
  });

  it('should create store with correct type for RootState', () => {
    const testStore = configureStore({
      reducer: {
        foodCatalog: foodReducer,
        favorites: favoritesReducer,
      },
    });

    const state: RootState = testStore.getState();

    expect(state.foodCatalog.foods).toBeDefined();
    expect(state.favorites.items).toBeDefined();
  });

  it('should allow dispatching actions', () => {
    const testStore = configureStore({
      reducer: {
        foodCatalog: foodReducer,
        favorites: favoritesReducer,
      },
    });

    testStore.dispatch({ type: 'foodCatalog/setCategory', payload: 'breakfast' });

    expect(testStore.getState().foodCatalog.category).toBe('breakfast');
  });

  it('should allow dispatching toggleFavorite action', () => {
    const testStore = configureStore({
      reducer: {
        foodCatalog: foodReducer,
        favorites: favoritesReducer,
      },
    });

    const mockFood = { id: 1, name: 'Test Food' };
    testStore.dispatch({ type: 'favorites/toggleFavorite', payload: mockFood });

    expect(testStore.getState().favorites.items).toHaveLength(1);
    expect(testStore.getState().favorites.items[0]).toEqual(mockFood);
  });

  it('should handle multiple reducer updates', () => {
    const testStore = configureStore({
      reducer: {
        foodCatalog: foodReducer,
        favorites: favoritesReducer,
      },
    });

    testStore.dispatch({ type: 'foodCatalog/setCategory', payload: 'lunch' });

    const mockFood = { id: 1, name: 'Test Food' };
    testStore.dispatch({ type: 'favorites/toggleFavorite', payload: mockFood });

    const state = testStore.getState();
    expect(state.foodCatalog.category).toBe('lunch');
    expect(state.favorites.items).toHaveLength(1);
  });

  it('should export AppDispatch type', () => {
    const dispatch: AppDispatch = store.dispatch;
    expect(typeof dispatch).toBe('function');
  });
});
