import { RouteObject } from 'react-router';
import HomePage from './pages/index';
import ServicePage from './pages/service';
import { services } from './lib/services';
// Eager import so renderToString doesn't hit a Suspense boundary on 404 routes
// and abort to client rendering. The prod 404 page is tiny; the dev-tools
// variant stays lazy because it pulls in dev-only code we don't want in
// production bundles.
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = ProdNotFoundPage;

// Kurdish lives at the root, English under /en and Arabic under /ar (see src/lib/lang-context.tsx).
// Every service page is listed by name, so a mistyped address falls through to the 404 page.
const prefixes = ['', '/en', '/ar'];

export const routes: RouteObject[] = [
  ...prefixes.flatMap<RouteObject>((p) => [
    { path: p || '/', element: <HomePage /> },
    ...services.map((s) => ({ path: `${p}/services/${s.slug}`, element: <ServicePage slug={s.slug} /> })),
  ]),
  {
    id: 'airo-not-found',
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/';

export type Params = Record<string, string | undefined>;
