import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import pt from 'react-intl/locale-data/pt';

import localeData from './locale-data';

addLocaleData([...pt, ...es, ...en]);

export const availableLocales = ['pt-BR', 'en', 'es'];
export const defaultLocale = 'pt-BR';
export const messages = localeData;

export const { intl } = new IntlProvider({
  locale: defaultLocale,
  messages: localeData,
}).getChildContext();

export const localeStrategy = (locale: any) => {
  const localeWithoutRegionCode = locale.toLowerCase().split(/[_-]+/)[0];
  let availableLocale = defaultLocale;

  if (availableLocales.includes(locale)) {
    availableLocale = locale;
  } else if (availableLocales.includes(localeWithoutRegionCode)) {
    availableLocale = localeWithoutRegionCode;
  }

  return availableLocale;
};

const SET_CURRENT_LOCALE = 'intl/SET_CURRENT_LOCALE';
const initialState = {
  currentLocale: defaultLocale,
  defaultLocale,
  locales: availableLocales,
  messages: localeData[defaultLocale],
};

export const setCurrentLocale = (payload: any) => ({
  type: SET_CURRENT_LOCALE,
  payload,
});

interface Action {
  type?: string;
  payload: 'pt-BR' | 'en' | 'es';
}

export const reducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case SET_CURRENT_LOCALE:
      return {
        ...state,
        currentLocale: action.payload,
        messages: localeData[action.payload],
      };
    default:
      return state;
  }
};
