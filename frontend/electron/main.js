import { join } from 'path';
import { app, BrowserWindow } from 'electron';
import { config } from 'dotenv';
config();

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: join(import.meta.dirname, 'preload.js'),
    },
  });

  if (!app.isPackaged) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(join(import.meta.dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);