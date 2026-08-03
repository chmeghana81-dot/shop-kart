import axios from 'axios';
import { STORAGE_KEYS } from '@constants/app';
import { getStorage, setStorage, removeStorageKeys } from '@utils/storage';

/**
 * Central Axios instance.
 * – Attaches the JWT access token to every request.
 * – On 401, attempts a silent token refresh; if that fails, clears
 *   auth state and redirects to /login.
 */
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

/* ── Request interceptor ────────────────────────────────── */
httpClient.interceptors.request.use(
  (config) => {
    const token = getStorage(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ── Response interceptor ───────────────────────────────── */
let isRefreshing = false;
let failedQueue  = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) =>
    error ? prom.reject(error) : prom.resolve(token)
  );
  failedQueue = [];
};

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return httpClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing            = true;

      try {
        const refreshToken = getStorage(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        setStorage(STORAGE_KEYS.AUTH_TOKEN,    data.accessToken);
        setStorage(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
        httpClient.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        removeStorageKeys(
          STORAGE_KEYS.AUTH_TOKEN,
          STORAGE_KEYS.REFRESH_TOKEN,
          STORAGE_KEYS.USER
        );
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
