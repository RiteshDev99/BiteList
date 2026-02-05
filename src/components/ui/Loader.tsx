import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

type LoaderProps = {
  size?: number;
  fullscreen?: boolean;
  style?: ViewStyle;
};

const Loader = ({ size = 110, fullscreen = false, style }: LoaderProps) => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <View style={[fullscreen ? styles.fullscreen : styles.center, style]}>
      <LottieView
        ref={animation}
        autoPlay
        loop
        style={{ width: size, height: size }}
        source={require('../../assests/loader/page.json')}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
