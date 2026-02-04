import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';

const DetailsScreen = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const item = route.params?.item ?? {};

  const [isFavorite, setIsFavorite] = useState(false);

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

          <Pressable
            style={styles.circleBtn}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color="#1a1a1a"
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
              {(item.category ?? 'BREAKFAST & BRUNCH').toUpperCase()}
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
          {item.description ??
            'Sourdough bread toasted to perfection, topped with creamy smashed hass avocado, organic cherry tomatoes, feta cheese crumbles, and a drizzle of balsamic glaze. Garnished with fresh chili flakes and microgreens.'}
        </Text>
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
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    lineHeight: 38,
  },
  priceRow: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  price: {
    color: '#00C853',
    fontWeight: '800',
    fontSize: 28,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaStar: {
    color: '#00C853',
    fontSize: 18,
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
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#bdbdbd',
    marginHorizontal: 12,
  },
  pillsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: '#F1F8F4',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillIcon: {
    marginRight: 6,
    fontSize: 14,
  },
  pillText: {
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 24,
    marginBottom: 12,
    color: '#1a1a1a',
  },
  description: {
    paddingHorizontal: 24,
    color: '#666666',
    lineHeight: 24,
    fontSize: 15,
  },
});

export default DetailsScreen;
