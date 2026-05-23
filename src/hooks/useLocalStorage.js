import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error(`useLocalStorage: error reading ${key}`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`useLocalStorage: error writing ${key}`, err);
    }
  }, [key, value]);

  const remove = () => {
    try {
      window.localStorage.removeItem(key);
      setValue(initialValue);
    } catch (err) {
      console.error(`useLocalStorage: error removing ${key}`, err);
    }
  };

  return [value, setValue, remove];
};

export default useLocalStorage;
