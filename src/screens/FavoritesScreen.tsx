import React from 'react';
import { View,  StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '../components/TopBar';
import FoodCard from '../components/FoodCard';
import { RootState, AppDispatch } from '../store/store';
import { toggleFavorite } from '../store/features/foodCatalog/favoritesSlice';
import EmptyState from '../components/ui/EmptyState.tsx';

const FavoriteScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleToggleFavorite = (item: any) => {
    dispatch(toggleFavorite(item));
  };

  return (
    <View style={styles.container}>
      <TopBar
        onProfilePress={() => console.log('Profile')}
        onSearchPress={() => console.log('Search')}
      />

      {favorites.length === 0 ? (
        <EmptyState
          title="Your Plate is Empty!"
          icon="heart-off-outline"
          actionText="Explore"
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <FoodCard
              item={item}
              hideImage={false}
              fullWidth
              grid={false}
              onFavoriteToggle={handleToggleFavorite}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { color: '#666', fontSize: 16, textAlign: 'center' },
  listContent: { padding: 16 },
});

export default FavoriteScreen;
