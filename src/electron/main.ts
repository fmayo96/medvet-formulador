import { app, BrowserWindow } from "electron";
import { getPreloadPath, getUIPath } from "./path-resolver.js";
import { ipcMainHandle, isDev, pickPhoto } from "./util.js";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { savePetProfile } from "./lib/pets.js";

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
  ipcMainHandle("submit", savePetProfile);
  ipcMainHandle("pickPhoto", pickPhoto);
});
