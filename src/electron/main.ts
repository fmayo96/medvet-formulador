import { app, BrowserWindow } from 'electron'
import { getPreloadPath, getUIPath } from './path-resolver.js'
import { ipcMainHandle, isDev } from './util.js'
import path from 'path'

console.log(getPreloadPath())

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    title: 'Medvet Formulador',
    webPreferences: {
      preload: getPreloadPath(),
    },
    width: 1600,
    height: 900,
    //icon: path.join(__dirname, 'assets', 'logo-medvet.png'),
  })
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123')
  } else {
    mainWindow.loadFile(getUIPath())
  }
  ipcMainHandle('hi', (data) => `Hi from ${data} Electron.js`)
})
