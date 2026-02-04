import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import TopBar from '../components/TopBar';
import CategoryTabs from '../components/CategoryTabs';
import FoodCard from '../components/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods } from '../store/features/foodCatalog/foodThunks';
import { AppDispatch, RootState } from '../store/store';
import Loader from '../components/ui/Loader.tsx';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { category, foods, status } = useSelector(
    (state: RootState) => state.foodCatalog,
  );

  useEffect(() => {
    dispatch(fetchFoods({ category, page: 1 }));
  }, [category, dispatch]);

  return (
    <View style={styles.container}>
      <TopBar onProfilePress={() => {}} onSearchPress={() => {}} />

      <CategoryTabs />

      <View style={styles.contentContainer}>
        {status === 'loading' ? (
          <View style={styles.loaderWrap}>
          <Loader/>
          </View>
        ) : (
          <FlatList
            data={foods}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <FoodCard item={item} hideImage={false} grid />
            )}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  seeAll: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  loaderWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 24,
  },
});

export default HomeScreen;
