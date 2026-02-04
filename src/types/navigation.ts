// src/types/navigation.ts
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  Home: undefined;
  Favorite: undefined;
  Details: undefined;
};

export type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;
export type FavoriteScreenProps = BottomTabScreenProps<
  RootTabParamList,
  'Favorite'
>;
export type DetailsScreenProps = BottomTabScreenProps<
  RootTabParamList,
  'Details'
>;
