import React, { memo } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodItem } from '../store/features/foodCatalog/ types.ts';

interface Props {
  item: FoodItem;
  onFavoriteToggle?: (item: FoodItem, liked: boolean) => void;
  hideImage?: boolean;
  fullWidth?: boolean;
  grid?: boolean;
}

const FoodCard = ({ item, hideImage, fullWidth, grid }: Props) => {
  const navigation: any = useNavigation();

  const openDetails = () => {
    // prefer navigating on parent navigator (stack) so Details is pushed above tabs
    const parent = navigation.getParent?.();
    if (parent && typeof parent.navigate === 'function') {
      parent.navigate('Details', { item });
    } else {
      navigation.navigate('Details', { item });
    }
  };

  return (
    <Pressable
      style={[
        styles.card,
        fullWidth && styles.cardFull,
        grid && styles.cardGrid,
      ]}
      onPress={openDetails}
    >
      {!hideImage && item.image ? (
        <Image
          source={{ uri: item.image }}
          style={[styles.image, grid ? styles.imageGrid : styles.imageFull]}
          resizeMode="cover"
        />
      ) : null}

      <View style={styles.content}>
        <View style={styles.ratingRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.rating}>{item.rating ?? 4.8}</Text>
          <Text style={styles.count}>(120+)</Text>
        </View>
        <Text numberOfLines={2} style={[styles.title, grid && styles.titleGrid]}>
          {item.name}
        </Text>
        <View style={styles.tagRow}>
          {item.category && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.category.toUpperCase()}</Text>
            </View>
          )}
          {item.price && (
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>${item.price}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default memo(FoodCard);

const styles = StyleSheet.create({
  card: {
    width: 180,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardFull: {
    width: '100%',
    marginRight: 0,
    borderRadius: 12,
    marginBottom: 12,
    padding: 0,
  },
  cardGrid: {
    flexBasis: '48%',
    flexGrow: 0,
    marginHorizontal: 4,
    marginBottom: 12,
    borderRadius: 12,
    padding: 0,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    backgroundColor: '#F6F6F6',
  },
  imageFull: {
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imageGrid: {
    height: 110,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 10,
    paddingTop: 8,
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    zIndex: 2,
  },
  heartText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  heartTextActive: {
    color: '#fff',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 6,
  },
  star: {
    color: '#4CAF50',
    marginRight: 6,
    fontSize: 12,
  },
  rating: {
    fontWeight: '600',
    fontSize: 12,
  },
  count: {
    marginLeft: 6,
    color: '#999',
    fontSize: 12,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#222',
    marginBottom: 6,
  },
  titleGrid: {
    fontSize: 14,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#E9F7EF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
  },
  tagText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
  priceTag: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priceText: {
    fontSize: 11,
    color: '#555',
    fontWeight: '600',
  },
});
