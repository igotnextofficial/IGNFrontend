import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
  type MutationKey,
  type QueryKey,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { captureSentryException } from '../utils/sentryHelpers';
import { SafeFetchError } from '../utils/safeFetch';

const formatKey = (key?: QueryKey | MutationKey): string => {
  if (Array.isArray(key)) {
    return key.join('::');
  }
  if (typeof key === 'string' || typeof key === 'number') {
    return String(key);
  }
  return 'unknown';
};

const shouldReportError = (error: unknown) => !(error instanceof SafeFetchError && error.isValidationError);

const queryCache = new QueryCache({
  onError: (error, query) => {
    if (!shouldReportError(error)) {
      return;
    }

    const queryKey = formatKey(query.queryKey);
    captureSentryException({
      error,
      url: `react-query:${queryKey}`,
      extras: { queryKey },
    });
  },
});

const mutationCache = new MutationCache({
  onError: (error, _variables, _context, mutation) => {
    if (!shouldReportError(error)) {
      return;
    }

    const mutationKey = formatKey(mutation.options?.mutationKey);
    captureSentryException({
      error,
      url: `react-mutation:${mutationKey}`,
      extras: { mutationKey },
    });
  },
});

const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

interface Props {
  children: ReactNode;
}

export const QueryClientProvider = ({ children }: Props) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}; 
