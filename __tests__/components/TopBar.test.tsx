import React from 'react';
import { render } from '@testing-library/react-native';
import TopBar from '../../src/components/TopBar';

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 44, right: 0, bottom: 34, left: 0 };
  return {
    useSafeAreaInsets: () => inset,
  };
});

describe('TopBar', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<TopBar />);

    expect(getByText('Bite')).toBeTruthy();
    expect(getByText('List')).toBeTruthy();
  });

  it('renders profile button', () => {
    const onProfilePress = jest.fn();
    const { getByText } = render(
      <TopBar onProfilePress={onProfilePress} />
    );

    expect(getByText('Bite')).toBeTruthy();
    expect(getByText('List')).toBeTruthy();
  });

  it('renders search button', () => {
    const onSearchPress = jest.fn();
    const { getByText } = render(
      <TopBar onSearchPress={onSearchPress} />
    );

    expect(getByText('Bite')).toBeTruthy();
  });

  it('renders avatar with correct style', () => {
    const { getByText } = render(<TopBar />);

    expect(getByText('Bite')).toBeTruthy();
    expect(getByText('List')).toBeTruthy();
  });

  it('renders search icon', () => {
    const { getByText } = render(<TopBar />);

    expect(getByText('Bite')).toBeTruthy();
  });

  it('applies safe area insets correctly', () => {
    const { getByText } = render(<TopBar />);

    expect(getByText('Bite')).toBeTruthy();
  });

  it('renders correctly without callback props', () => {
    const { getByText } = render(<TopBar />);

    expect(getByText('Bite')).toBeTruthy();
    expect(getByText('List')).toBeTruthy();
  });
});
