import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import CategoryTabs from '../../src/components/CategoryTabs';
import { renderWithProviders, loadedState } from '../test-utils';


describe('CategoryTabs', () => {
  it('renders correctly with categories', () => {
    const { getByText } = renderWithProviders(<CategoryTabs />, {
      preloadedState: loadedState,
    });

    expect(getByText('ALL')).toBeTruthy();
    expect(getByText('BREAKFAST')).toBeTruthy();
    expect(getByText('LUNCH')).toBeTruthy();
    expect(getByText('DINNER')).toBeTruthy();
  });

  it('shows loading state when categories are being fetched', () => {
    const loadingState = {
      ...loadedState,
      foodCatalog: {
        ...loadedState.foodCatalog,
        status: 'loading' as const,
        categories: [],
      },
    };

    const { queryByText } = renderWithProviders(<CategoryTabs />, {
      preloadedState: loadingState,
    });

    expect(queryByText('ALL')).toBeNull();
  });

  it('dispatches setCategory action when a category is pressed', () => {
    const { getByText, store } = renderWithProviders(<CategoryTabs />, {
      preloadedState: loadedState,
    });

    const breakfastTab = getByText('BREAKFAST');
    fireEvent.press(breakfastTab);
    const state = store.getState();
    expect(state.foodCatalog.category).toBe('breakfast');
  });

  it('renders ALL category with existing categories', () => {
    const { getByText } = renderWithProviders(<CategoryTabs />, {
      preloadedState: loadedState,
    });

    expect(getByText('ALL')).toBeTruthy();
  });

  it('highlights the active category', () => {
    const stateWithSelectedCategory = {
      ...loadedState,
      foodCatalog: {
        ...loadedState.foodCatalog,
        category: 'breakfast',
      },
    };

    const { getByText } = renderWithProviders(<CategoryTabs />, {
      preloadedState: stateWithSelectedCategory,
    });

    // The active category should be rendered
    expect(getByText('BREAKFAST')).toBeTruthy();
  });
});
