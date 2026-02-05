import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/features/foodCatalog/favoritesSlice';
import { RootState } from '../store/store';
import RecommendedCard from '../components/RecommendedCard';

const DetailsScreen = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const item = useMemo(() => route.params?.item ?? {}, [route.params]);

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const allFoods = useSelector((state: RootState) => state.foodCatalog.foods);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recommended, setRecommended] = useState<any[]>([]);

  useEffect(() => {
    const exists = favorites.some((f: any) => f.id === item.id);
    setIsFavorite(!!exists);
  }, [favorites, item.id]);

  useEffect(() => {
    if (!allFoods || allFoods.length === 0) {
      setRecommended([]);
      return;
    }

    const tags = item.tags ?? [];
    if (!tags || tags.length === 0) {
      setRecommended([]);
      return;
    }

    const recs = allFoods
      .filter((f: any) => f.id !== item.id)
      .filter((f: any) => (f.tags ?? []).some((t: string) => tags.includes(t)))
      .slice(0, 6);

    setRecommended(recs);
  }, [allFoods, item]);

  const onToggleFavorite = () => {
    dispatch(toggleFavorite(item));
    setIsFavorite(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.headerImage}
        imageStyle={styles.headerImageStyle}
      >
        <View style={styles.headerButtons}>
          <Pressable
            style={styles.circleBtn}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#1a1a1a" />
          </Pressable>

          <Pressable style={styles.circleBtn} onPress={onToggleFavorite}>
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={isFavorite ? '#FF6B6B' : '#1a1a1a'}
            />
          </Pressable>
        </View>
      </ImageBackground>

      <ScrollView
        style={styles.sheet}
        contentContainerStyle={styles.sheetContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {(item.category ?? 'BREAKFAST').toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.title}>
            {item.name ?? 'Gourmet Avocado Toast'}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price ?? '12.50'}</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaStar}>★</Text>
            <Text style={styles.metaText}>{item.rating ?? '4.8'}</Text>
            <Text style={styles.metaMuted}>
              ({item.reviews ?? '124'} reviews)
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {item.description ?? 'No description available.'}
        </Text>

        {recommended && recommended.length > 0 && (
          <View style={styles.recsWrap}>
            <Text style={[styles.sectionTitle, styles.recsTitle]}>
              Recommended for you
            </Text>
            <FlatList
              data={recommended}
              keyExtractor={recItem => `rec-${recItem.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recsList}
              renderItem={({ item: recItem }) => (
                <View style={styles.cardWrapper}>
                  <RecommendedCard item={recItem} />
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  headerImage: {
    width: '100%',
    height: 380,
    backgroundColor: '#e5e5e5',
  },
  headerImageStyle: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  circleBtn: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sheet: {
    flex: 1,
    marginTop: -28,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  sheetContent: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  badgeRow: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#2E7D32',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  titleRow: {
    paddingHorizontal: 24,
    marginBottom: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    lineHeight: 28,
  },
  priceRow: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  price: {
    color: '#00C853',
    fontWeight: '800',
    fontSize: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 5,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaStar: {
    color: '#00C853',
    fontSize: 16,
    marginRight: 4,
  },
  metaText: {
    fontWeight: '700',
    color: '#1a1a1a',
    fontSize: 15,
  },
  metaMuted: {
    color: '#9e9e9e',
    marginLeft: 4,
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 24,
    marginBottom: 8,
    marginTop: 8,
    color: '#1a1a1a',
  },
  description: {
    paddingHorizontal: 24,
    color: '#666666',
    lineHeight: 22,
    fontSize: 15,
    marginBottom: 5,
  },
  recsWrap: {
    marginTop: 5,
  },
  recsTitle: {
    marginBottom: 16,
  },
  recsList: {
    paddingHorizontal: 24,
  },
  cardWrapper: {
    marginRight: 16,
  },
});

export default DetailsScreen;
