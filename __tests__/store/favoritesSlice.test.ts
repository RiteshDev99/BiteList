import favoritesReducer, { toggleFavorite, setFavorites } from '../../src/store/features/foodCatalog/favoritesSlice';
import { FavoritesState, FoodItem } from '../../src/store/features/foodCatalog/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
}));

describe('favoritesSlice', () => {
  const initialState: FavoritesState = {
    items: [],
  };

  const mockFood: FoodItem = {
    id: 1,
    name: 'Test Food',
    price: 12.99,
    category: 'Breakfast',
    rating: 4.5,
  };

  const mockFood2: FoodItem = {
    id: 2,
    name: 'Another Food',
    price: 15.99,
    category: 'Lunch',
    rating: 4.8,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    describe('setFavorites', () => {
      it('should set favorites from payload', () => {
        const favorites = [mockFood, mockFood2];
        const actual = favoritesReducer(initialState, setFavorites(favorites));

        expect(actual.items).toEqual(favorites);
        expect(actual.items).toHaveLength(2);
      });

      it('should replace existing favorites', () => {
        const stateWithFavorites: FavoritesState = {
          items: [mockFood],
        };
        const newFavorites = [mockFood2];
        const actual = favoritesReducer(stateWithFavorites, setFavorites(newFavorites));

        expect(actual.items).toEqual(newFavorites);
        expect(actual.items).toHaveLength(1);
        expect(actual.items[0].id).toBe(2);
      });

      it('should handle empty array', () => {
        const stateWithFavorites: FavoritesState = {
          items: [mockFood],
        };
        const actual = favoritesReducer(stateWithFavorites, setFavorites([]));

        expect(actual.items).toEqual([]);
        expect(actual.items).toHaveLength(0);
      });
    });

    describe('toggleFavorite', () => {
      it('should add item to favorites when not already present', () => {
        const actual = favoritesReducer(initialState, toggleFavorite(mockFood));

        expect(actual.items).toHaveLength(1);
        expect(actual.items[0]).toEqual(mockFood);
      });

      it('should remove item from favorites when already present', () => {
        const stateWithFavorite: FavoritesState = {
          items: [mockFood],
        };
        const actual = favoritesReducer(stateWithFavorite, toggleFavorite(mockFood));

        expect(actual.items).toHaveLength(0);
      });

      it('should add second item to favorites', () => {
        const stateWithFavorite: FavoritesState = {
          items: [mockFood],
        };
        const actual = favoritesReducer(stateWithFavorite, toggleFavorite(mockFood2));

        expect(actual.items).toHaveLength(2);
        expect(actual.items).toContainEqual(mockFood);
        expect(actual.items).toContainEqual(mockFood2);
      });

      it('should remove only the targeted item', () => {
        const stateWithMultipleFavorites: FavoritesState = {
          items: [mockFood, mockFood2],
        };
        const actual = favoritesReducer(stateWithMultipleFavorites, toggleFavorite(mockFood));

        expect(actual.items).toHaveLength(1);
        expect(actual.items[0]).toEqual(mockFood2);
      });

      it('should call AsyncStorage.setItem when toggling favorite', () => {
        favoritesReducer(initialState, toggleFavorite(mockFood));

        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });

      it('should persist updated favorites to AsyncStorage', () => {
        favoritesReducer(initialState, toggleFavorite(mockFood));

        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          'BITE_LIST_FAVORITES',
          JSON.stringify([mockFood])
        );
      });

      it('should persist empty array when removing last favorite', () => {
        const stateWithFavorite: FavoritesState = {
          items: [mockFood],
        };
        favoritesReducer(stateWithFavorite, toggleFavorite(mockFood));

        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          'BITE_LIST_FAVORITES',
          JSON.stringify([])
        );
      });
    });
  });

  describe('edge cases', () => {
    it('should handle item with only id', () => {
      const minimalItem: FoodItem = { id: 99, name: 'Minimal' };
      const actual = favoritesReducer(initialState, toggleFavorite(minimalItem));

      expect(actual.items).toHaveLength(1);
      expect(actual.items[0].id).toBe(99);
    });

    it('should match items by id only', () => {
      const stateWithFavorite: FavoritesState = {
        items: [mockFood],
      };
      const modifiedFood: FoodItem = { ...mockFood, name: 'Modified Name' };
      const actual = favoritesReducer(stateWithFavorite, toggleFavorite(modifiedFood));

      expect(actual.items).toHaveLength(0);
    });

    it('should handle multiple adds and removes', () => {
      let state = favoritesReducer(initialState, toggleFavorite(mockFood));
      expect(state.items).toHaveLength(1);

      state = favoritesReducer(state, toggleFavorite(mockFood2));
      expect(state.items).toHaveLength(2);

      state = favoritesReducer(state, toggleFavorite(mockFood));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(2);

      state = favoritesReducer(state, toggleFavorite(mockFood2));
      expect(state.items).toHaveLength(0);
    });
  });
});
