import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBarStyle,

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },

        tabBarIcon: ({ focused }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Favorite':
              iconName = 'favorite';
              break;
            default:
              iconName = 'home';
          }

          return (
            <Icon
              name={iconName}
              size={26}
              color={focused ? '#00e05e' : '#999'}
            />
          );
        },

        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={FavoritesScreen} />

      {/* Details screen remains registered so cards can navigate to it, but it's hidden from the tab bar */}
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          // do not render a tab button for Details
          tabBarButton: () => null,
          // when Details is active, hide the tab bar
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
});
