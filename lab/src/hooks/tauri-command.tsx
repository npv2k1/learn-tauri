import { invoke } from "@tauri-apps/api/tauri";

export const tauriCommand = {
  greet: "greet",
};

export type TauriCommand = keyof typeof tauriCommand;

export const useTauriCommand = () => {
  const tauriCommand = async (
    command: TauriCommand,
    args: Record<string, unknown>
  ) => {
    const response = await invoke(command, args);
    return response;
  };
  return [tauriCommand];
};
