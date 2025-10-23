import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { captureSentryException } from '../utils/sentryHelpers';
import { SafeFetchError } from '../utils/safeFetch';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error, query) => {
        if (error instanceof SafeFetchError && error.isValidationError) {
          return;
        }

        const queryKey = Array.isArray(query.queryKey) ? query.queryKey.join('::') : String(query.queryKey ?? 'unknown');
        captureSentryException({
          error,
          url: `react-query:${queryKey}`,
          extras: {
            queryKey
          }
        });
      },
    },
    mutations: {
      onError: (error, _variables, _context, mutation) => {
        if (error instanceof SafeFetchError && error.isValidationError) {
          return;
        }

        const mutationKey = Array.isArray(mutation.options.mutationKey)
          ? mutation.options.mutationKey.join('::')
          : String(mutation.options.mutationKey ?? 'unknown');

        captureSentryException({
          error,
          url: `react-mutation:${mutationKey}`,
          extras: {
            mutationKey
          }
        });
      }
    }
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
