import { Reducers } from 'src/store/configureStore';
import { useAppBridge } from '@shopify/app-bridge-react';

declare global {
  declare module '*.png' {
    const content: string;
    export default content;
  }
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  declare module '*.svg' {
    const content: string;
    export default content;
  }
  declare module '*.gif' {
    const content: string;
    export default content;
  }

  type AppState = Reducers;
  type RootState = Reducers;
  type GetState = () => AppState;
  type Status = 'idle' | 'loading' | 'success' | 'failure';

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    $crisp: any;
    CRISP_WEBSITE_ID: string;
    tidioChatApi?: any;
    _APP_: any;
  }

  type App = ReturnType<typeof useAppBridge>;
}
