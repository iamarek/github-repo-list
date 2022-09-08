/** Pass key of local Storage row to get data as JSON */
export const getStateFromLocalStorage = <T>(key: string): T | null => {
  if (localStorage.hasOwnProperty(key)) {
    let value = localStorage.getItem(key);

    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }
  }

  return null;
};

/** Pass key and data to save it in Local Storage as string */
export const saveStateToLocalStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};
