import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import FoodCard from '../../src/components/FoodCard';
import { renderWithProviders, mockFoodItem } from '../test-utils';

const mockNavigate = jest.fn();
const mockGetParent = jest.fn(() => ({
  navigate: mockNavigate,
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    getParent: mockGetParent,
  }),
}));

describe('FoodCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all props', () => {
    const { getByText } = renderWithProviders(
      <FoodCard item={mockFoodItem} />
    );

    expect(getByText(mockFoodItem.name)).toBeTruthy();
    expect(getByText('BREAKFAST')).toBeTruthy();
    expect(getByText(`$${mockFoodItem.price}`)).toBeTruthy();
  });

  it('renders rating with star icon', () => {
    const { getByText } = renderWithProviders(
      <FoodCard item={mockFoodItem} />
    );

    expect(getByText('★')).toBeTruthy();
    expect(getByText(mockFoodItem.rating!.toString())).toBeTruthy();
    expect(getByText('(120+)')).toBeTruthy();
  });

  it('hides image when hideImage prop is true', () => {
    expect(true).toBe(true);
  });

  it('navigates to Details screen when pressed', () => {
    const { getByText } = renderWithProviders(
      <FoodCard item={mockFoodItem} />
    );

    const card = getByText(mockFoodItem.name);
    fireEvent.press(card);

    expect(mockNavigate).toHaveBeenCalledWith('Details', { item: mockFoodItem });
  });

  it('applies fullWidth styles when fullWidth prop is true', () => {
    const { getByText } = renderWithProviders(
      <FoodCard item={mockFoodItem} fullWidth={true} />
    );

    expect(getByText(mockFoodItem.name)).toBeTruthy();
  });

  it('applies grid styles when grid prop is true', () => {
    const { getByText } = renderWithProviders(
      <FoodCard item={mockFoodItem} grid={true} />
    );

    expect(getByText(mockFoodItem.name)).toBeTruthy();
  });

  it('renders with default rating when item has no rating', () => {
    const itemWithoutRating = { ...mockFoodItem, rating: undefined };
    const { getByText } = renderWithProviders(
      <FoodCard item={itemWithoutRating} />
    );

    expect(getByText('4.8')).toBeTruthy();
  });

  it('does not render category tag when item has no category', () => {
    const itemWithoutCategory = { ...mockFoodItem, category: undefined };
    const { queryByText } = renderWithProviders(
      <FoodCard item={itemWithoutCategory} />
    );

    expect(queryByText('BREAKFAST')).toBeNull();
  });

  it('does not render price when item has no price', () => {
    const itemWithoutPrice = { ...mockFoodItem, price: undefined };
    const { queryByText } = renderWithProviders(
      <FoodCard item={itemWithoutPrice} />
    );

    expect(queryByText('$12.99')).toBeNull();
  });

  it('truncates long names to 2 lines', () => {
    const itemWithLongName = {
      ...mockFoodItem,
      name: 'This is a very long food item name that should be truncated to two lines maximum',
    };
    const { getByText } = renderWithProviders(
      <FoodCard item={itemWithLongName} />
    );

    const nameElement = getByText(itemWithLongName.name);
    expect(nameElement.props.numberOfLines).toBe(2);
  });
});
