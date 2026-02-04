import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BiteList</Text>
      <Text style={styles.subtitle}>Discover your next favorite meal</Text>

      <Text style={styles.text}>
        Browse a curated list of food items from our mock API. Tap on any item
        to see details and save your favorites.
      </Text>
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
