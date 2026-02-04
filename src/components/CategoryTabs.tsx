import React, { useEffect } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../store/features/foodCatalog/foodSlice.ts';
import { fetchCategories } from '../store/features/foodCatalog/foodThunks';
import { AppDispatch } from '../store/store';

const DEFAULT_CATEGORIES: string[] = [];

export default function CategoryTabs() {
  const dispatch = useDispatch<AppDispatch>();
  const selected = useSelector((state: any) => state.foodCatalog.category);
  const categories: string[] = useSelector((state: any) => state.foodCatalog.categories ?? []);
  const status: string = useSelector((state: any) => state.foodCatalog.status);

  useEffect(() => {
    if ((categories == null || categories.length === 0) && status !== 'loading') {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch, status]);

  const normalized = Array.from(new Set([
    'all',
    ...categories.map((c: string) => (c || '').toLowerCase()),
  ]));

  const list = normalized.length ? normalized : DEFAULT_CATEGORIES;

  return (
    <View style={styles.container}>
      {status === 'loading' && (!categories || categories.length === 0) ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="small" color="#00e05e" />
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((cat: string, idx: number) => {
            const active = selected === cat;

            return (
              <Pressable
                key={`${cat}-${idx}`}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 15,
  },
  loaderWrap: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#00e05e',
  },
  text: {
    fontWeight: '600',
    color: '#444',
  },
  activeText: {
    color: '#fff',
  },
});
