import { invoke } from '@tauri-apps/api/tauri';

export const setDbStorage = async (key: string, value: string) => {
  return await invoke('put_db', { key, value });
};

export const getDbStorage = async (key: string): Promise<string> => {
  return (await invoke('get_db', { key })) || '';
};
