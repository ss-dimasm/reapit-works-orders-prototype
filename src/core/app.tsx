import React, { FC } from 'react'
import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import '@reapit/elements/dist/index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App: FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <NavStateProvider>
        <MediaStateProvider>
          <SnackProvider>
            <Router />
          </SnackProvider>
        </MediaStateProvider>
      </NavStateProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ErrorBoundary>
)

export default App
