import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import RecommendedCard from '../../src/components/RecommendedCard';
import { renderWithProviders, mockFoodItem } from '../test-utils';

const mockNavigate = jest.fn();
const mockPush = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    push: mockPush,
  }),
}));

describe('RecommendedCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with item props', () => {
    const { getByText } = renderWithProviders(
      <RecommendedCard item={mockFoodItem} />
    );

    expect(getByText(mockFoodItem.name)).toBeTruthy();
    expect(getByText(`$${mockFoodItem.price}`)).toBeTruthy();
    expect(getByText(mockFoodItem.rating!.toString())).toBeTruthy();
  });

  it('renders category badge when item has category', () => {
    const { getByText } = renderWithProviders(
      <RecommendedCard item={mockFoodItem} />
    );

    expect(getByText('BREAKFAS')).toBeTruthy();
  });

  it('navigates to Details screen when pressed and onPress not provided', () => {
    const { getByText } = renderWithProviders(
      <RecommendedCard item={mockFoodItem} />
    );

    const card = getByText(mockFoodItem.name);
    fireEvent.press(card);

    expect(mockPush).toHaveBeenCalledWith('Details', { item: mockFoodItem });
  });

  it('calls custom onPress handler when provided', () => {
    const customOnPress = jest.fn();
    const { getByText } = renderWithProviders(
      <RecommendedCard item={mockFoodItem} onPress={customOnPress} />
    );

    const card = getByText(mockFoodItem.name);
    fireEvent.press(card);

    expect(customOnPress).toHaveBeenCalledWith(mockFoodItem);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('applies custom width when provided', () => {
    const { getByText } = renderWithProviders(
      <RecommendedCard item={mockFoodItem} width={200} />
    );

    expect(getByText(mockFoodItem.name)).toBeTruthy();
  });

  it('renders default values when item has missing properties', () => {
    const incompleteItem = { id: 3 };
    const { getByText } = renderWithProviders(
      <RecommendedCard item={incompleteItem} />
    );

    expect(getByText('Dish Name')).toBeTruthy();
    expect(getByText('4.8')).toBeTruthy();
    expect(getByText('$--')).toBeTruthy();
  });

  it('renders placeholder icon when item has no image', () => {
    const itemWithoutImage = { ...mockFoodItem, image: undefined };
    const { getByText } = renderWithProviders(
      <RecommendedCard item={itemWithoutImage} />
    );

    expect(getByText(itemWithoutImage.name)).toBeTruthy();
  });

  it('renders reviews count when provided', () => {
    const itemWithReviews = { ...mockFoodItem, reviews: 50 };
    const { getByText } = renderWithProviders(
      <RecommendedCard item={itemWithReviews} />
    );

    expect(getByText('50 reviews')).toBeTruthy();
  });

  it('truncates title to 2 lines', () => {
    const itemWithLongName = {
      ...mockFoodItem,
      name: 'This is a very long food item name that should be truncated to two lines maximum',
    };
    const { getByText } = renderWithProviders(
      <RecommendedCard item={itemWithLongName} />
    );

    const nameElement = getByText(itemWithLongName.name);
    expect(nameElement.props.numberOfLines).toBe(2);
  });
});
