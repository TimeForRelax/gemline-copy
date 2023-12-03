import { NotFoundHandler } from '@features/index';
import { routes } from '@routes/index';
import { StyleContextProvider } from '@styles/index';
import { renderRoutes } from '@utils/index';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <StyleContextProvider>
      <NotFoundHandler>{renderRoutes(routes as any, 0)}</NotFoundHandler>
    </StyleContextProvider>
  </BrowserRouter>,
);
