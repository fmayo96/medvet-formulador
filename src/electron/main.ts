import { app, BrowserWindow, ipcMain } from "electron"
import { getPreloadPath, getUIPath } from "./path-resolver.js"
import { isDev } from "./util.js"

console.log(getPreloadPath())

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    title: "Medvet Formulador",
    webPreferences: {
      preload: getPreloadPath(),
    },
  })
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123")
  } else {
    mainWindow.loadFile(getUIPath())
  }
  ipcMain.handle("hi", () => "Hello from electron")
})
