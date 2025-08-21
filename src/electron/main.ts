import { app, BrowserWindow } from "electron";
import { getPreloadPath, getUIPath } from "./path-resolver.js";
import { ipcMainHandle, isDev, pickPhoto } from "./util.js";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { getAllPets, savePetProfile } from "./lib/pets.js";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.DB_FILE_NAME!,
});

export const db = drizzle(client);

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
  ipcMainHandle("getAllPets", getAllPets);
});
