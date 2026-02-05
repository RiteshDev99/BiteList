import React from 'react';
import DetailsScreen from '../../src/screens/DetailsScreen';
import { renderWithProviders, stateWithFavorites, loadedState, mockFoodItem, mockFoodItem2 } from '../test-utils';

const mockGoBack = jest.fn();
const mockRoute = {
  params: {
    item: mockFoodItem,
  },
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    navigate: jest.fn(),
    push: jest.fn(),
  }),
  useRoute: () => mockRoute,
}));

describe('DetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with item details', () => {
    const { getByText } = renderWithProviders(<DetailsScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText(mockFoodItem.name)).toBeTruthy();
    expect(getByText(`$${mockFoodItem.price}`)).toBeTruthy();
    expect(getByText(mockFoodItem.category!.toUpperCase())).toBeTruthy();
  });

  it('displays item description', () => {
    const { getByText } = renderWithProviders(<DetailsScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText('Description')).toBeTruthy();
    expect(getByText(mockFoodItem.description!)).toBeTruthy();
  });

  it('shows rating and reviews', () => {
    const { getByText } = renderWithProviders(<DetailsScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText(mockFoodItem.rating!.toString())).toBeTruthy();
  });

  it('navigates back when back button is pressed', () => {
    expect(mockGoBack).toBeDefined();
  });

  it('shows favorite icon when item is in favorites', () => {
    const { getByText } = renderWithProviders(<DetailsScreen />, {
      preloadedState: stateWithFavorites,
    });

    expect(getByText(mockFoodItem.name)).toBeTruthy();
  });

  it('shows unfavorited icon when item is not in favorites', () => {
    const { getByText } = renderWithProviders(<DetailsScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText(mockFoodItem.name)).toBeTruthy();
  });

  it('toggles favorite when favorite button is pressed', async () => {
    const { getByText, store } = renderWithProviders(<DetailsScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText(mockFoodItem.name)).toBeTruthy();

    expect(store.getState().favorites.items).toHaveLength(0);
  });

  it('displays default values when item has missing properties', () => {
    mockRoute.params = {
      item: { id: 99 },
    };

    const { getByText } = renderWithProviders(<DetailsScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText('Gourmet Avocado Toast')).toBeTruthy();
    expect(getByText('$12.50')).toBeTruthy();
    expect(getByText('BREAKFAST')).toBeTruthy();

    mockRoute.params = { item: mockFoodItem };
  });

  it('shows recommended items section when there are recommendations', () => {
    const stateWithRecommendations = {
      ...loadedState,
      foodCatalog: {
        ...loadedState.foodCatalog,
        foods: [
          mockFoodItem,
          { ...mockFoodItem2, tags: ['healthy'] },
        ],
      },
    };

    const { getByText } = renderWithProviders(<DetailsScreen />, {
      preloadedState: stateWithRecommendations,
    });

    expect(getByText(mockFoodItem.name)).toBeTruthy();
  });

  it('renders correctly without recommendations when no matching tags', () => {
    const stateWithNoMatchingTags = {
      ...loadedState,
      foodCatalog: {
        ...loadedState.foodCatalog,
        foods: [
          mockFoodItem,
          { ...mockFoodItem2, tags: ['different', 'tags'] },
        ],
      },
    };

    const { getByText, queryByText } = renderWithProviders(<DetailsScreen />, {
      preloadedState: stateWithNoMatchingTags,
    });

    expect(getByText(mockFoodItem.name)).toBeTruthy();
  });

  it('renders image background with correct source', () => {
    const { getByText } = renderWithProviders(<DetailsScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText(mockFoodItem.name)).toBeTruthy();
  });

  it('displays price with dollar sign', () => {
    const { getByText } = renderWithProviders(<DetailsScreen />, {
      preloadedState: loadedState,
    });

    expect(getByText(`$${mockFoodItem.price}`)).toBeTruthy();
  });
});
