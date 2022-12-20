import { RoutePropagator as AppBridgeRoutePropagator } from '@shopify/app-bridge-react';
import React from 'react';
import { useLocation } from 'react-router-dom';

/** Component dùng để thay đổi url theo route react khi ở admin embed */
function RoutePropagatorComponent() {
  const location = useLocation();
  return <AppBridgeRoutePropagator location={location} />;
}

export const RoutePropagator = RoutePropagatorComponent;
