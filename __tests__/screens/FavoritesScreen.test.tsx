import React from 'react';
import FavoritesScreen from '../../src/screens/FavoritesScreen';
import { renderWithProviders, stateWithFavorites, loadedState, mockFoodItem } from '../test-utils';

describe('FavoritesScreen', () => {
  it('renders correctly with TopBar', () => {
    const { getByText } = renderWithProviders(<FavoritesScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText('Bite')).toBeTruthy();
    expect(getByText('List')).toBeTruthy();
  });

  it('shows EmptyState when there are no favorites', () => {
    const { getByText } = renderWithProviders(<FavoritesScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText('Your Plate is Empty!')).toBeTruthy();
  });

  it('renders favorite items when favorites exist', () => {
    const { getByText } = renderWithProviders(<FavoritesScreen />, {
      preloadedState: stateWithFavorites,
    });

    expect(getByText(mockFoodItem.name)).toBeTruthy();
  });

  it('displays FoodCard for each favorite item', () => {
    const stateWithMultipleFavorites = {
      ...loadedState,
      favorites: {
        items: [
          mockFoodItem,
          {
            id: 3,
            name: 'Third Favorite',
            price: 20.99,
            category: 'Dinner',
          },
        ],
      },
    };

    const { getByText } = renderWithProviders(<FavoritesScreen />, {
      preloadedState: stateWithMultipleFavorites,
    });

    expect(getByText(mockFoodItem.name)).toBeTruthy();
    expect(getByText('Third Favorite')).toBeTruthy();
  });

  it('renders food cards with fullWidth style', () => {
    const { getByText } = renderWithProviders(<FavoritesScreen />, {
      preloadedState: stateWithFavorites,
    });

    expect(getByText(mockFoodItem.name)).toBeTruthy();
  });

  it('renders empty state with correct icon', () => {
    const { getByText } = renderWithProviders(<FavoritesScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText('Your Plate is Empty!')).toBeTruthy();
  });

  it('can toggle favorite from the list', () => {
    const { getByText, store } = renderWithProviders(<FavoritesScreen />, {
      preloadedState: stateWithFavorites,
    });

    expect(getByText(mockFoodItem.name)).toBeTruthy();

    const state = store.getState();
    expect(state.favorites.items).toHaveLength(1);
  });

  it('renders correctly after removing all favorites', () => {
    const { store, rerender, getByText } = renderWithProviders(<FavoritesScreen />, {
      preloadedState: stateWithFavorites,
    });

    store.dispatch({ type: 'favorites/toggleFavorite', payload: mockFoodItem });

    const state = store.getState();
    expect(state.favorites.items).toHaveLength(0);
  });
});
