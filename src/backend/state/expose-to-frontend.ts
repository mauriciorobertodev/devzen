import { BrowserWindow, IpcMainInvokeEvent, ipcMain } from 'electron';
import { StateVariable } from './variable-state';

export function exposeStateVariableToRenderer<T>(
    browserWindow: BrowserWindow,
    name: string,
    stateVariable: StateVariable<T>
): {
    init: () => void;
    dispose: () => void;
} {
    const onStateVariableChange = (newValue: T | null): void => {
        browserWindow.webContents.send(`change-state-variable:${name}`, newValue);
    };

    const onBrowserChange = (_event: IpcMainInvokeEvent, value: T): void => {
        stateVariable.value = value;
    };

    return {
        init: (): void => {
            // if value changes, notify browser
            stateVariable.onChange(onStateVariableChange);

            // if browser value changes, notify main
            ipcMain.handle(`change-state-variable:${name}`, onBrowserChange);

            // if browser asks for current value, send it
            ipcMain.handle(`get-state-variable:${name}`, () => stateVariable.value);
        },
        dispose: (): void => {
            stateVariable.offChange(onStateVariableChange);
            ipcMain.removeHandler(`change-state-variable:${name}`);
        }
    };
}
