import { ElectronAPI } from '@electron-toolkit/preload';
import type { StateVariableBridge } from '@shared/types/state';

declare global {
    interface Window {
        electron: ElectronAPI;
        api: unknown;
        stateVariableBridge: StateVariableBridge;
    }
}
