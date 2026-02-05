import React from 'react';
import { render } from '@testing-library/react-native';
import Loader from '../../../src/components/ui/Loader';

jest.mock('lottie-react-native', () => {
  const React = require('react');
  const { View } = require('react-native');
  return React.forwardRef((props: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      play: jest.fn(),
      pause: jest.fn(),
      reset: jest.fn(),
    }));
    return React.createElement(View, { testID: 'lottie-animation', ...props });
  });
});

describe('Loader', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Loader />);

    expect(getByTestId('lottie-animation')).toBeTruthy();
  });

  it('renders with custom size', () => {
    const customSize = 200;
    const { getByTestId } = render(<Loader size={customSize} />);

    const lottie = getByTestId('lottie-animation');
    expect(lottie.props.style.width).toBe(customSize);
    expect(lottie.props.style.height).toBe(customSize);
  });

  it('renders with default size of 110', () => {
    const { getByTestId } = render(<Loader />);

    const lottie = getByTestId('lottie-animation');
    expect(lottie.props.style.width).toBe(110);
    expect(lottie.props.style.height).toBe(110);
  });

  it('applies fullscreen styles when fullscreen prop is true', () => {
    const { getByTestId } = render(<Loader fullscreen={true} />);

    expect(getByTestId('lottie-animation')).toBeTruthy();
  });

  it('applies center styles when fullscreen prop is false', () => {
    const { getByTestId } = render(<Loader fullscreen={false} />);

    expect(getByTestId('lottie-animation')).toBeTruthy();
  });

  it('applies custom style when provided', () => {
    const customStyle = { marginTop: 20 };
    const { getByTestId } = render(<Loader style={customStyle} />);

    expect(getByTestId('lottie-animation')).toBeTruthy();
  });

  it('renders with autoPlay enabled', () => {
    const { getByTestId } = render(<Loader />);

    const lottie = getByTestId('lottie-animation');
    expect(lottie.props.autoPlay).toBe(true);
  });

  it('renders with loop enabled', () => {
    const { getByTestId } = render(<Loader />);

    const lottie = getByTestId('lottie-animation');
    expect(lottie.props.loop).toBe(true);
  });
});
