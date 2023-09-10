export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const setLocalStorage = (key: string, value: any) => {
  setLocalStorage(key, JSON.stringify(value));
};
