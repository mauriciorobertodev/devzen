import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { BrowserWindow, app, shell } from 'electron';
import { join } from 'path';
import icon from '../../resources/icon.png?asset';
import { exposeStateVariableToRenderer } from './state/expose-to-frontend';
import { StateVariable } from './state/variable-state';

function createWindow(): void {
    const token = new StateVariable<string | null>(null);
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    });

    const splashWindow = new BrowserWindow({
        width: 500,
        height: 300,
        transparent: false,
        frame: false,
        alwaysOnTop: true,
        show: true,
        center: true,
        movable: false,
        resizable: false,
        roundedCorners: true
    });

    splashWindow.on('ready-to-show', () => splashWindow.show());

    mainWindow.on('ready-to-show', () => {
        splashWindow.close();
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
        splashWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/splash/');
    } else {
        mainWindow.loadFile(join(__dirname, '../frontend/index.html'));
        splashWindow.loadFile(join(__dirname, '../frontend/splash/index.html'));
    }

    const { init, dispose } = exposeStateVariableToRenderer(mainWindow, 'token', token);

    init();

    mainWindow.on('closed', () => {
        dispose();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron');

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
