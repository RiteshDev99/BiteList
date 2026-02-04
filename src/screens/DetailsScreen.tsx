// src/screens/DetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DetailsScreenProps } from '../types/navigation';
import TopBar from '../components/TopBar.tsx';

const DetailsScreen: React.FC<DetailsScreenProps> = () => {
  return (
    <View style={styles.container}>
      <TopBar
        onProfilePress={() => console.log('Profile')}
        onSearchPress={() => console.log('Search')}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Details Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default DetailsScreen;
