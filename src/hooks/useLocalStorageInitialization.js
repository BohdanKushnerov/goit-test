import { useEffect } from "react";

const useLocalStorageInitialization = (key, initValue) => {
  useEffect(() => {
    const initializeLocalStorage = () => {
      const storedValue = JSON.parse(localStorage.getItem(key));
      if (!storedValue) {
        localStorage.setItem(key, JSON.stringify(initValue));
      }
    };

    initializeLocalStorage();
  }, [key, initValue]);
};

export default useLocalStorageInitialization;
