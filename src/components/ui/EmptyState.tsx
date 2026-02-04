import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface EmptyStateProps {
  title: string;
  icon?: string;
  actionText?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  icon = 'heart-off-outline',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.circleBg}>
        <View style={styles.card}>
          <Icon name={icon} size={88} color="#00e05e" />
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  circleBg: {
    width: 60,
    height: 60,
    borderRadius: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  card: {
    width: 180,
    height: 180,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
  },

  description: {
    textAlign: 'center',
    fontSize: 15,
    color: '#777',
    lineHeight: 22,
  },

  button: {
    marginTop: 18,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
