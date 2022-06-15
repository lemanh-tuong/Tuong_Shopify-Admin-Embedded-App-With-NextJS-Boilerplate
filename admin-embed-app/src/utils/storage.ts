import { isBrowser } from './isBrowser';

let checked = false;
const storageAvailable = () => {
  if (!checked) {
    checked = true;
    const item = '@localStorageCheck';
    try {
      window.localStorage.setItem(item, item);
      window.localStorage.removeItem(item);
      return true;
    } catch {
      return false;
    }
  }
};

const createStorage = (): Storage => {
  if (storageAvailable()) {
    return window.localStorage;
  } else {
    return {
      getItem() {
        return null;
      },
      setItem: isBrowser ? window.localStorage.setItem : () => {},
      removeItem: isBrowser ? window.localStorage.removeItem : () => {},
      clear: isBrowser ? window.localStorage.clear : () => {},
      key() {
        return null;
      },
      length: 0,
    };
  }
};

export const storage = createStorage();
