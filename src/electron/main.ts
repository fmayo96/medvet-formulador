import { app, BrowserWindow } from "electron";
import { getPreloadPath, getUIPath } from "./path-resolver.js";
import { ipcMainHandle, isDev } from "./util.js";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle(process.env.DB_FILE_NAME!);

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    title: "Medvet Formulador",
    webPreferences: {
      preload: getPreloadPath(),
    },
    width: 1600,
    height: 900,
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }
  ipcMainHandle("hi", (data) => `Hi from ${data} Electron.js`);
});
