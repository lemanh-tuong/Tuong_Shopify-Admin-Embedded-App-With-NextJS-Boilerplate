import { isBrowser } from './isBrowser';

export const openLink = (url: string) => {
  if (isBrowser) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    window.close();
    if (newWindow) {
      newWindow.opener = null;
    }
  }
};
