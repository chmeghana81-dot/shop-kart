import httpClient from './httpClient';
import { API_ENDPOINTS } from '@constants/api';

/**
 * All product-related API calls against DummyJSON.
 */
const productService = {
  /**
   * Fetch a paginated list of products.
   * @param {{ limit?: number, skip?: number }} params
   */
  getAll: (params = {}) =>
    httpClient.get(API_ENDPOINTS.PRODUCTS, { params }),

  /**
   * Fetch a single product by ID.
   */
  getById: (id) =>
    httpClient.get(API_ENDPOINTS.PRODUCT_BY_ID(id)),

  /**
   * Search products by query string.
   * @param {{ q: string, limit?: number, skip?: number }} params
   */
  search: (params) =>
    httpClient.get(API_ENDPOINTS.PRODUCTS_SEARCH, { params }),

  /**
   * Fetch products filtered by category.
   * @param {string} category - category slug
   * @param {{ limit?: number, skip?: number }} params
   */
  getByCategory: (category, params = {}) =>
    httpClient.get(API_ENDPOINTS.PRODUCTS_CATEGORY(category), { params }),

  /**
   * Fetch all category names.
   */
  getCategories: () =>
    httpClient.get(API_ENDPOINTS.CATEGORIES),
};

export default productService;
