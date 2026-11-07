import { createRoot } from 'react-dom/client';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { RouterProvider, createMemoryRouter } from 'react-router';
import RootLayout from '../src/layouts/RootLayout';
import HomePage from '../src/pages/index';
import { Outlet } from 'react-router';
import '../src/styles/globals.css';

// The contact form posts straight to Formspree, so it works in this preview too.
// The AI assistant needs the server, so here it uses its built-in answers.
const realFetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  if (url.endsWith('/api/chat')) return Promise.resolve(new Response('{}', { status: 503 }));
  return realFetch(input, init);
};

const router = createMemoryRouter([
  {
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [{ path: '/', element: <HomePage /> }],
  },
]);

createRoot(document.getElementById('app')!).render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
);
