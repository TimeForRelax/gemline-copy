import { UNIQUE_PREFIX } from '../consts';

interface LocalStorage {
  set: Function;
  get: Function;
  remove: Function;
}

export const ls: LocalStorage = {
  set: <T = object>(key: string, value: T): void => {
    if (!localStorage) {
      return;
    }
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(UNIQUE_PREFIX + key, serializedValue);
    } catch (error) {
      throw new Error('store serialization failed');
    }
  },
  get: <T = object>(key: string): T | undefined => {
    if (!localStorage) {
      return;
    }

    try {
      const serializedValue = localStorage.getItem(UNIQUE_PREFIX + key);
      if (serializedValue == null) {
        return;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      throw new Error('store deserialization failed');
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(UNIQUE_PREFIX + key);
    } catch (err) {
      throw new Error("couldn't remove localStorage item");
    }
  },
};
