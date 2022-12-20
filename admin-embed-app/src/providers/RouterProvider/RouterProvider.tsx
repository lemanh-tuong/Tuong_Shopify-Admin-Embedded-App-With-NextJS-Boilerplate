import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoutePropagator } from './components/RoutePropagator';

export const RouterProvider: FC = ({ children }) => {
  return (
    <BrowserRouter>
      <RoutePropagator />
      {children}
    </BrowserRouter>
  );
};
