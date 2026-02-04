// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HomeScreenProps } from '../types/navigation';
import TopBar from '../components/TopBar.tsx';

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const handleProfilePress = () => {
    console.log('Profile pressed');
    // Navigate to profile or open profile modal
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
    // Navigate to search screen
  };

  return (
    <View style={styles.container}>
      <TopBar
        onProfilePress={handleProfilePress}
        onSearchPress={handleSearchPress}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Home Screen</Text>
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

export default HomeScreen;
