import httpClient from './httpClient';
import { API_ENDPOINTS } from '@constants/api';

/**
 * Authentication API calls — DummyJSON /auth endpoints.
 */
const authService = {
  /**
   * Login with DummyJSON credentials.
   * Returns { accessToken, refreshToken, ... user fields }.
   * @param {{ username: string, password: string, expiresInMins?: number }} credentials
   */
  login: (credentials) =>
    httpClient.post(API_ENDPOINTS.AUTH_LOGIN, {
      ...credentials,
      expiresInMins: 30,
    }),

  /**
   * Refresh the access token using a refresh token.
   * @param {string} refreshToken
   */
  refresh: (refreshToken) =>
    httpClient.post(API_ENDPOINTS.AUTH_REFRESH, { refreshToken }),

  /**
   * Fetch the currently authenticated user's profile.
   * Requires a valid Authorization header (injected by interceptor).
   */
  getMe: () =>
    httpClient.get(API_ENDPOINTS.AUTH_ME),
};

export default authService;
