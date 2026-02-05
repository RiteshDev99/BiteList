import axios from 'axios';
import { fetchFoodsApi, fetchCategoriesApi } from '../../src/store/features/foodCatalog/foodApi';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('foodApi', () => {
  const mockApiResponse = {
    data: {
      record: {
        data: [
          {
            id: 1,
            title: 'Pancakes',
            thumbNailImage: 'https://example.com/pancakes.jpg',
            rating: 4.5,
            category: 'Breakfast',
            tags: ['sweet', 'morning'],
            description: 'Fluffy pancakes',
            price: 9.99,
          },
          {
            id: 2,
            name: 'Salad',
            mainImage: 'https://example.com/salad.jpg',
            rating: 4.2,
            category: 'Lunch',
            tags: ['healthy', 'fresh'],
            summary: 'Fresh garden salad',
            price: 12.99,
          },
          {
            id: 3,
            title: 'Steak',
            image: 'https://example.com/steak.jpg',
            rating: 4.8,
            category: 'Dinner',
            tags: ['protein', 'grilled'],
            description: 'Premium grilled steak',
            price: 24.99,
          },
        ],
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchFoodsApi', () => {
    it('should fetch foods from API and transform data correctly', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await fetchFoodsApi();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.jsonbin.io/v3/b/698184b543b1c97be96155bf/latest'
      );
      expect(result).toHaveLength(3);
    });

    it('should map title to name when title is present', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await fetchFoodsApi();

      expect(result[0].name).toBe('Pancakes');
    });

    it('should use name field when title is not present', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await fetchFoodsApi();

      expect(result[1].name).toBe('Salad');
    });

    it('should map thumbNailImage to image as first priority', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await fetchFoodsApi();

      expect(result[0].image).toBe('https://example.com/pancakes.jpg');
    });

    it('should map mainImage to image as second priority', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await fetchFoodsApi();

      expect(result[1].image).toBe('https://example.com/salad.jpg');
    });

    it('should map image field as third priority', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await fetchFoodsApi();

      expect(result[2].image).toBe('https://example.com/steak.jpg');
    });

    it('should map description field correctly', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await fetchFoodsApi();

      expect(result[0].description).toBe('Fluffy pancakes');
    });

    it('should use summary as description fallback', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await fetchFoodsApi();

      expect(result[1].description).toBe('Fresh garden salad');
    });

    it('should map all other fields correctly', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await fetchFoodsApi();

      expect(result[0].id).toBe(1);
      expect(result[0].rating).toBe(4.5);
      expect(result[0].category).toBe('Breakfast');
      expect(result[0].tags).toEqual(['sweet', 'morning']);
      expect(result[0].price).toBe(9.99);
    });

    it('should handle empty data response', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          record: {
            data: [],
          },
        },
      });

      const result = await fetchFoodsApi();

      expect(result).toEqual([]);
    });

    it('should handle missing record.data', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          record: {},
        },
      });

      const result = await fetchFoodsApi();

      expect(result).toEqual([]);
    });

    it('should use fallback name when both title and name are missing', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          record: {
            data: [
              { id: 10, price: 5.99 },
            ],
          },
        },
      });

      const result = await fetchFoodsApi();

      expect(result[0].name).toBe('Item 10');
    });

    it('should throw error when API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchFoodsApi()).rejects.toThrow('Network error');
    });
  });

  describe('fetchCategoriesApi', () => {
    it('should fetch categories from foods', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await fetchCategoriesApi();

      expect(result).toContain('Breakfast');
      expect(result).toContain('Lunch');
      expect(result).toContain('Dinner');
    });

    it('should return unique categories', async () => {
      const responseWithDuplicates = {
        data: {
          record: {
            data: [
              { id: 1, title: 'Food 1', category: 'Breakfast' },
              { id: 2, title: 'Food 2', category: 'Breakfast' },
              { id: 3, title: 'Food 3', category: 'Lunch' },
            ],
          },
        },
      };
      mockedAxios.get.mockResolvedValueOnce(responseWithDuplicates);

      const result = await fetchCategoriesApi();

      expect(result).toHaveLength(2);
      expect(result).toContain('Breakfast');
      expect(result).toContain('Lunch');
    });

    it('should handle items without category', async () => {
      const responseWithoutCategory = {
        data: {
          record: {
            data: [
              { id: 1, title: 'Food 1' },
              { id: 2, title: 'Food 2', category: 'Lunch' },
            ],
          },
        },
      };
      mockedAxios.get.mockResolvedValueOnce(responseWithoutCategory);

      const result = await fetchCategoriesApi();

      expect(result).toContain('Unknown');
      expect(result).toContain('Lunch');
    });

    it('should return empty array when no foods', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          record: {
            data: [],
          },
        },
      });

      const result = await fetchCategoriesApi();

      expect(result).toEqual([]);
    });

    it('should throw error when API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(fetchCategoriesApi()).rejects.toThrow('API Error');
    });
  });
});
