import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Loader from '../ui/Loader.tsx';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BiteList</Text>
      <Text style={styles.subtitle}>Discover your next favorite meal</Text>

    <Loader/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
    lineHeight: 20,
  },
});
