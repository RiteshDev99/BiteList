import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { store } from './src/store/store.ts';
import { setFavorites } from './src/store/features/foodCatalog/  favoritesSlice.ts';
import TabNavigator from './src/navigations/TabNavigator';

const InitApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFavorites = async () => {
      const data = await AsyncStorage.getItem('BITE_LIST_FAVORITES');
      if (data) {
        dispatch(setFavorites(JSON.parse(data)));
      }
    };
    loadFavorites();
  }, [dispatch]);

  return <TabNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <InitApp />
      </NavigationContainer>
    </Provider>
  );
}
