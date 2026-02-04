import React, { useEffect } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../store/features/foodCatalog/foodSlice.ts';
import { fetchCategories } from '../store/features/foodCatalog/foodThunks';

const DEFAULT_CATEGORIES = ['all', 'italian', 'sushi', 'burger'];

export default function CategoryTabs() {
  const dispatch = useDispatch();
  const selected = useSelector((state: any) => state.foodCatalog.category);
  const categories = useSelector((state: any) => state.foodCatalog.categories ?? []);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      // @ts-ignore
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  const list = categories.length ? categories.map((c: string) => c.toLowerCase()) : DEFAULT_CATEGORIES;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {list.map((cat: string) => {
          const active = selected === cat;

          return (
            <Pressable
              key={cat}
              onPress={() => dispatch(setCategory(cat))}
              style={[styles.tab, active && styles.activeTab]}
            >
              <Text style={[styles.text, active && styles.activeText]}>
                {cat.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  text: {
    fontWeight: '600',
    color: '#444',
  },
  activeText: {
    color: '#fff',
  },
});
