import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { store } from '@/lib/store/store';
import { refreshThunk } from '@/lib/store/auth.thunks';
import api from './axios';

type RequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

export function setupInterceptors() {
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const original = error.config as RequestConfig | undefined;

      if (
        error.response?.status !== 401 ||
        !original ||
        original._retry
      ) {
        throw error;
      }

      original._retry = true;

      try {
        const res = await store.dispatch(refreshThunk()).unwrap();
        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${res.accessToken}`;
        return api(original);
      } catch {
        throw error;
      }
    },
  );
}
