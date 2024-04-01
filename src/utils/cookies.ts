import { DOMAIN_URL, UNIQUE_PREFIX } from '../consts';

const setCookie = (key, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  document.cookie = `${UNIQUE_PREFIX}${key}=${encodeURIComponent(
    value,
  )}; domain=${DOMAIN_URL}; path=/; expires=${expires}`;
};

const getCookie = (key) => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + UNIQUE_PREFIX + key + '=');
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
};

const removeCookie = (key) => {
  setCookie(key, '', -1);
};

interface CookieStorage {
  set: Function;
  get: Function;
  remove: Function;
}

export const cs: CookieStorage = {
  set: <T = object>(key: string, value: T, days = 365): void => {
    try {
      const serializedValue = JSON.stringify(value);
      setCookie(key, serializedValue, days);
    } catch (error) {
      throw new Error('Cookie serialization failed');
    }
  },
  get: <T = object>(key: string): T | undefined => {
    try {
      const serializedValue = getCookie(key);
      if (serializedValue == null) {
        return;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      throw new Error('Cookie deserialization failed');
    }
  },
  remove: (key: string) => {
    try {
      removeCookie(key);
    } catch (error) {
      throw new Error("Couldn't remove cookie");
    }
  },
};
