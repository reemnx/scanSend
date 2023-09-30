import { createBrowserRouter } from 'react-router-dom';
import { Dashboard } from '../views/dashboard/pages';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <Dashboard />,
  },
]);
