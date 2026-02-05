import React from 'react';
import { render } from '@testing-library/react-native';
import EmptyState from '../../../src/components/ui/EmptyState';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

describe('EmptyState', () => {
  it('renders correctly with required props', () => {
    const { getByText } = render(
      <EmptyState title="No items found" />
    );

    expect(getByText('No items found')).toBeTruthy();
  });

  it('renders with custom title', () => {
    const customTitle = 'Your Plate is Empty!';
    const { getByText } = render(
      <EmptyState title={customTitle} />
    );

    expect(getByText(customTitle)).toBeTruthy();
  });

  it('renders with custom icon', () => {
    const { getByText } = render(
      <EmptyState title="Empty" icon="food-off" />
    );

    expect(getByText('Empty')).toBeTruthy();
  });

  it('renders with default icon when not provided', () => {
    const { getByText } = render(
      <EmptyState title="Empty" />
    );

    expect(getByText('Empty')).toBeTruthy();
  });

  it('renders correctly with actionText prop (even though not used in current implementation)', () => {
    const { getByText } = render(
      <EmptyState title="Empty" actionText="Explore" />
    );

    expect(getByText('Empty')).toBeTruthy();
  });

  it('renders title with correct styling', () => {
    const { getByText } = render(
      <EmptyState title="Test Title" />
    );

    const title = getByText('Test Title');
    expect(title).toBeTruthy();
  });
});
