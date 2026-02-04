import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HomeScreenProps } from '../types/navigation';
import TopBar from '../components/TopBar';
import CategoryTabs from '../components/CategoryTabs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods } from '../store/features/foodCatalog/foodThunks';
import { AppDispatch, RootState } from '../store/store.ts';

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { category } = useSelector(
    (state: RootState) => state.foodCatalog,
  );

  useEffect(() => {
    dispatch(fetchFoods({ category, page: 1 }));
  }, [category, dispatch]);

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
  };

  return (
    <View style={styles.container}>
      <TopBar
        onProfilePress={handleProfilePress}
        onSearchPress={handleSearchPress}
      />

      <CategoryTabs />

      <View style={styles.content}>
        <Text style={styles.text}>Foods will load here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: '#333' },
});

export default HomeScreen;
