import { StateVariableBridge } from '@shared/types/state';
import { contextBridge, ipcRenderer } from 'electron';

export function getCurrentValue<T>(name: string): Promise<T | null> {
    return ipcRenderer.invoke(`get-state-variable:${name}`);
}

export function registerStateVariableBridge() {
    return function <T>(name: string, onChange: (value: T | null) => void): () => void {
        const onMainProcessChange = (_event: Electron.IpcRendererEvent, value: T | null): void => {
            onChange(value);
        };

        ipcRenderer.on(`change-state-variable:${name}`, onMainProcessChange);

        return (): void => {
            ipcRenderer.removeListener(`change-state-variable:${name}`, onMainProcessChange);
        };
    };
}

export function propagateBrowserChange<T>(name: string, value: T | null): void {
    ipcRenderer.invoke(`change-state-variable:${name}`, value);
}

export function initializeStateVariableBridge(): void {
    const exposed: StateVariableBridge = {
        registerStateVariableBridge: registerStateVariableBridge(),
        propagateBrowserChange,
        getCurrentValue
    };

    contextBridge.exposeInMainWorld('stateVariableBridge', exposed);
}
