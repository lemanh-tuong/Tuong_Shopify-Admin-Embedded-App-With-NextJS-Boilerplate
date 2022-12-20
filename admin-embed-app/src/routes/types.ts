import { ReactNode } from 'react';

export interface Page {
  path: string;
  component: ReactNode | null;
}
