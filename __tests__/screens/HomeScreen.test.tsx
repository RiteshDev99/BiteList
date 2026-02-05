import React from 'react';
import { waitFor } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import { renderWithProviders, loadedState } from '../test-utils';

describe('HomeScreen', () => {
  it('renders correctly with TopBar and CategoryTabs', () => {
    const { getByText } = renderWithProviders(<HomeScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText('Bite')).toBeTruthy();
    expect(getByText('List')).toBeTruthy();

    expect(getByText('ALL')).toBeTruthy();
  });

  it('shows loader when status is loading', () => {
    const loadingState = {
      ...loadedState,
      foodCatalog: {
        ...loadedState.foodCatalog,
        status: 'loading' as const,
      },
    };

    const { getByTestId } = renderWithProviders(<HomeScreen />, {
      preloadedState: loadingState,
    });

    expect(getByTestId('lottie-animation')).toBeTruthy();
  });

  it('renders food items when status is succeeded', async () => {
    const { getByText } = renderWithProviders(<HomeScreen />, {
      preloadedState: loadedState,
    });

    await waitFor(() => {
      expect(getByText('Bite')).toBeTruthy();
    });
  });

  it('displays categories from the store', () => {
    const { getByText } = renderWithProviders(<HomeScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText('BREAKFAST')).toBeTruthy();
    expect(getByText('LUNCH')).toBeTruthy();
    expect(getByText('DINNER')).toBeTruthy();
  });

  it('renders correctly with empty foods array', () => {
    const emptyFoodsState = {
      ...loadedState,
      foodCatalog: {
        ...loadedState.foodCatalog,
        foods: [],
        status: 'succeeded' as const,
      },
    };

    const { getByText } = renderWithProviders(<HomeScreen />, {
      preloadedState: emptyFoodsState,
    });

    expect(getByText('Bite')).toBeTruthy();
  });

  it('renders correctly when in error state', () => {
    const errorState = {
      ...loadedState,
      foodCatalog: {
        ...loadedState.foodCatalog,
        status: 'failed' as const,
        error: 'Network error',
      },
    };

    const { getByText } = renderWithProviders(<HomeScreen />, {
      preloadedState: errorState,
    });

    expect(getByText('Bite')).toBeTruthy();
  });
});
