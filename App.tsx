import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { store } from './src/store/store';
import { setFavorites } from './src/store/features/foodCatalog/favoritesSlice';
import AppNavigator from './src/navigations/AppNavigator';

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

  return <AppNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <InitApp />
    </Provider>
  );
}
