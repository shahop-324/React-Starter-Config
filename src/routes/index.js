import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'problem-1', element: <Problem1 /> }, // Problem 1
        { path: 'problem-2', element: <Problem2 /> }, // Problem 1
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const Problem1 = Loadable(lazy(() => import('../pages/Problem1')));
const Problem2 = Loadable(lazy(() => import('../pages/Problem2')));



