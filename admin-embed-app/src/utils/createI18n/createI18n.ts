import * as R from 'ramda';
import { isBrowser } from '../isBrowser';
import { storage } from '../storage';
import { strToCapitalize } from '../strToCapitalize';
import { I18n, TransitionDefault } from './types';

export const createI18n = <T extends TransitionDefault>(source: T): I18n<T[keyof T]> => {
  let _locale = isBrowser ? storage.getItem('__LOCALE__') || navigator.language || 'en' : 'en';
  isBrowser && storage.setItem('__LOCALE__', _locale);
  const _setLocale = (locale: string) => {
    isBrowser && storage.setItem('__LOCALE__', locale);
    _locale = isBrowser ? (storage.getItem('__LOCALE__') as string) : 'en';
  };

  const _getLocale = () => {
    return _locale.replace(/(-|_).*/g, '');
  };

  const translation: I18n<T[keyof T]>['t'] = (key, options) => {
    const _lang = source[_locale.replace(/(-|_).*/g, '')] || source['en'];
    const _options = options as Record<string, string>;
    if (!_lang) {
      return '';
    }
    const value = key.includes('.') ? R.path(key.split('.'), _lang) : _lang[key as string];
    if (!_options) {
      return value.replace(/%%(\s*\w*\s*)%%/g, '').trim();
    }
    const text = Object.entries(R.omit(['textTransform'], _options)).reduce<string>((acc, [prop, value]) => {
      const regex = new RegExp(`%%\\s*${prop}\\s*%%`, 'g');
      if (!acc) {
        return '';
      }
      return acc.replace(regex, value).trim();
    }, value);

    switch (_options.textTransform) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'capitalize':
        return strToCapitalize(text);
      case 'none':
      default:
        return text;
    }
  };

  return {
    setLocale: _setLocale,
    getLocale: _getLocale,
    t: translation,
  };
};
