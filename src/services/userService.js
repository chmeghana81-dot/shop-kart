import httpClient from './httpClient';
import { API_ENDPOINTS } from '@constants/api';

/**
 * User-related API calls — DummyJSON /users endpoints.
 */
const userService = {
  /** Get a user by ID */
  getById: (id) =>
    httpClient.get(API_ENDPOINTS.USER_BY_ID(id)),

  /** Get the carts belonging to a user */
  getCarts: (userId) =>
    httpClient.get(API_ENDPOINTS.USER_CART(userId)),

  /** Get all orders for a user (DummyJSON returns cart data here) */
  getOrders: (userId) =>
    httpClient.get(API_ENDPOINTS.USER_ORDERS(userId)),
};

export default userService;
