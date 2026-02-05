import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface RecommendedCardProps {
  item: any;
  onPress?: (item: any) => void;
  width?: number;
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({
  item,
  onPress,
  width = 180,
}) => {
  const navigation: any = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(item);
    } else {
      if (navigation && typeof navigation.push === 'function') {
        navigation.push('Details', { item });
      } else {
        navigation.navigate('Details', { item });
      }
    }
  };

  return (
    <Pressable
      style={[styles.card, { width }]}
      onPress={handlePress}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
    >
      {/* Image Section */}
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Icon name="restaurant" size={32} color="#bdbdbd" />
          </View>
        )}

        {item.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {item.category.slice(0, 8).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {item.name ?? 'Dish Name'}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color="#FFA726" />
            <Text style={styles.rating}>{item.rating ?? '4.8'}</Text>
          </View>

          <Text style={styles.price}>${item.price ?? '--'}</Text>
        </View>

        {item.reviews && (
          <Text style={styles.reviews}>{item.reviews} reviews</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 200, 83, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#424242',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#00C853',
  },
  reviews: {
    fontSize: 11,
    color: '#9e9e9e',
    marginTop: 4,
  },
});

export default RecommendedCard;
