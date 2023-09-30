import { useStore } from './store';
import { useLayoutEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes.tsx';

function App() {
  const { setSocketInstance } = useStore((state) => state);

  // Before App render, establish Socket connection
  useLayoutEffect(() => {
    setSocketInstance();
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
