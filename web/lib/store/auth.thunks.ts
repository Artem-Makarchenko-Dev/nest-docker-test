import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api/axios';
import type { AuthUser } from './auth.types';

type ApiError = { message?: string; code?: string };

let refreshInFlight: Promise<{ accessToken: string } | null> | null = null;

export const loginThunk = createAsyncThunk<
  { accessToken: string },
  { email: string; password: string },
  { rejectValue: ApiError }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post<{ accessToken: string }>(
      '/auth/login',
      payload,
    );
    return { accessToken: data.accessToken };
  } catch (e: unknown) {
    const err = e as { response?: { data?: ApiError } };
    return rejectWithValue(err?.response?.data ?? { message: 'LOGIN_FAILED' });
  }
});

export const refreshThunk = createAsyncThunk<
  { accessToken: string },
  void,
  { rejectValue: ApiError }
>('auth/refresh', async (_, { rejectWithValue }) => {
  if (refreshInFlight) {
    const res = await refreshInFlight;
    if (!res) return rejectWithValue({ message: 'REFRESH_FAILED' });
    return res;
  }

  refreshInFlight = (async () => {
    try {
      const { data } = await api.post<{ accessToken: string }>(
        '/auth/refresh',
        {},
      );
      return { accessToken: data.accessToken };
    } catch {
      return null;
    } finally {
      refreshInFlight = null;
    }
  })();

  const result = await refreshInFlight;
  if (!result) return rejectWithValue({ message: 'REFRESH_FAILED' });
  return result;
});

export const meThunk = createAsyncThunk<
  AuthUser,
  void,
  { rejectValue: ApiError }
>('auth/me', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<AuthUser>('/auth/me');
    return data;
  } catch (e: unknown) {
    const err = e as { response?: { data?: ApiError } };
    return rejectWithValue(err?.response?.data ?? { message: 'ME_FAILED' });
  }
});

export const logoutThunk = createAsyncThunk<
  { ok: true },
  void,
  { rejectValue: ApiError }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await api.post('/auth/logout');
    return { ok: true };
  } catch (e: unknown) {
    const err = e as { response?: { data?: ApiError } };
    return rejectWithValue(err?.response?.data ?? { message: 'LOGOUT_FAILED' });
  }
});

export const bootstrapAuthThunk = createAsyncThunk<
  { didRefresh: boolean },
  void,
  { rejectValue: ApiError }
>('auth/bootstrap', async (_, { dispatch, rejectWithValue }) => {
  try {
    await dispatch(refreshThunk()).unwrap();
    await dispatch(meThunk()).unwrap();
    return { didRefresh: true };
  } catch (e: unknown) {
    const err = e as { response?: { data?: ApiError } };
    return rejectWithValue(
      err?.response?.data ?? { message: 'BOOTSTRAP_SKIP' },
    );
  }
});
