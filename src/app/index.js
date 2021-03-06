/*
 * The content of this file is licensed. You may obtain a copy of
 * the license at https://github.com/thsmi/sieve/ or request it via
 * email from the author.
 *
 * Do not remove or change this comment.
 *
 * The initial author of the code is:
 *   Thomas Schmid <schmid-thomas@gmx.net>
 */

(function () {

  "use strict";

  const { app, Menu, BrowserWindow } = require('electron');
  const path = require('path');
  const url = require('url');

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win;

  /**
   * Creates the main window
   *
   */
  function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 1200, height: 600, webPreferences: {
      // nodeIntegrationInSubFrames: true,
      nodeIntegration: true
    } });
    // win.setMenu(null);

    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'app.html'),
      protocol: 'file:',
      slashes: true
    }));

    // Open the DevTools.
    // win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
    });

    // As suggested in https://github.com/electron/electron/issues/4068
    const inputMenu = Menu.buildFromTemplate([
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'}
    ]);

    win.webContents.on('context-menu', (e, props) => {
      const { isEditable } = props;
      if (isEditable) {
        inputMenu.popup(win);
      }
    });
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

})();
