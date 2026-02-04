import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FavoriteScreenProps } from '../types/navigation';
import TopBar from '../components/TopBar.tsx';

const FavoriteScreen: React.FC<FavoriteScreenProps> = () => {
  return (
    <View style={styles.container}>
      <TopBar
        onProfilePress={() => console.log('Profile')}
        onSearchPress={() => console.log('Search')}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Favorite Screen</Text>
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

export default FavoriteScreen;
