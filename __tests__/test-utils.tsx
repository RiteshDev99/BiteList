import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import foodReducer from '../src/store/features/foodCatalog/foodSlice';
import favoritesReducer from '../src/store/features/foodCatalog/favoritesSlice';
import { RootState } from '../src/store/store';

// Create a test store with optional preloaded state
export function createTestStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      foodCatalog: foodReducer,
      favorites: favoritesReducer,
    },
    preloadedState,
  });
}

// Custom render function that includes Redux Provider
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof createTestStore>;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = createTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Mock food item for testing
export const mockFoodItem = {
  id: 1,
  name: 'Test Food Item',
  image: 'https://example.com/food.jpg',
  rating: 4.5,
  category: 'Breakfast',
  tags: ['healthy', 'quick'],
  description: 'A delicious test food item',
  price: 12.99,
};

export const mockFoodItem2 = {
  id: 2,
  name: 'Another Food Item',
  image: 'https://example.com/food2.jpg',
  rating: 4.8,
  category: 'Lunch',
  tags: ['quick', 'tasty'],
  description: 'Another delicious test food item',
  price: 15.99,
};

export const mockFoodItems = [mockFoodItem, mockFoodItem2];

// Default initial state
export const defaultInitialState: RootState = {
  foodCatalog: {
    foods: [],
    status: 'idle',
    error: null,
    category: 'all',
    page: 1,
    hasMore: true,
    categories: [],
  },
  favorites: {
    items: [],
  },
};

// State with foods loaded
export const loadedState: RootState = {
  foodCatalog: {
    foods: mockFoodItems,
    status: 'succeeded',
    error: null,
    category: 'all',
    page: 2,
    hasMore: false,
    categories: ['Breakfast', 'Lunch', 'Dinner'],
  },
  favorites: {
    items: [],
  },
};

export const stateWithFavorites: RootState = {
  ...loadedState,
  favorites: {
    items: [mockFoodItem],
  },
};

export * from '@testing-library/react-native';

describe('test-utils', () => {
  it('exports renderWithProviders function', () => {
    expect(renderWithProviders).toBeDefined();
  });

  it('exports mock food items', () => {
    expect(mockFoodItem).toBeDefined();
    expect(mockFoodItem2).toBeDefined();
    expect(mockFoodItems).toBeDefined();
  });

  it('exports initial states', () => {
    expect(defaultInitialState).toBeDefined();
    expect(loadedState).toBeDefined();
    expect(stateWithFavorites).toBeDefined();
  });
});

