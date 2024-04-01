import { NotFoundHandler } from '@features/index';
import { routes } from '@routes/index';
import { StyleContextProvider } from '@styles/index';
import { renderRoutes, ScrollToTop } from '@utils/index';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@styles/global.css';
import { GlobalProvider } from './globalContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GlobalProvider>
        <StyleContextProvider>
          <NotFoundHandler>
            {renderRoutes(routes as any, 0)}
            <ScrollToTop />
          </NotFoundHandler>
        </StyleContextProvider>
      </GlobalProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
