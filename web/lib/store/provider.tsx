'use client';

import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { store } from './store';
import { bootstrapAuthThunk } from './auth.thunks';
import { setupInterceptors } from '@/lib/api/interceptors';

let initialized = false;

export function ReduxProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    setupInterceptors();
    store.dispatch(bootstrapAuthThunk());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
