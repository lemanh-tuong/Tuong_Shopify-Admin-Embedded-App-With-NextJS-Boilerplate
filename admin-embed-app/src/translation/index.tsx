import { createI18n, isBrowser } from 'src/utils';
import { FC, useEffect, useRef, useState } from 'react';
import { createGlobalState } from 'react-use';
import { generalEN } from './en';
import { generalVI } from './vi';

export const translation = {
  en: generalEN,
  vi: generalVI,
} as const;

const _i18n = createI18n(translation);

const useGlobalState = createGlobalState([]);

export const i18n = {
  t: _i18n.t,
};

export const useSetLocale = () => {
  const [, listener] = useGlobalState();
  const setLocale = (locale: string) => {
    _i18n.setLocale(locale);
    listener([]);
  };
  return setLocale;
};

export const I18nProvider: FC = ({ children }) => {
  const [listenState] = useGlobalState();
  const [state, setState] = useState<[] | null>([]);
  const timeoutRef = useRef(0);

  useEffect(() => {
    setState(null);
    if (isBrowser) {
      timeoutRef.current = window.setTimeout(() => {
        setState([]);
      }, 0);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [listenState]);

  if (!state) {
    return <div>{children}</div>;
  }

  return <>{children}</>;
};
