import { app, BrowserWindow, Menu } from 'electron'
import { getPreloadPath, getUIPath } from './path-resolver.js'
import { ipcMainHandle, isDev, pickPhoto } from './util.js'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { getAllPets, getPetById, savePetProfile } from './lib/pets.js'
import { createClient } from '@libsql/client'
import {
  getAllRecipes,
  getRecipesByPetName,
  saveRecipe,
} from './lib/recipes.js'
import path from 'path'
import fs from 'fs'
import { pathToFileURL } from 'url'

const userDataPath = app.getPath('userData')
const dbPath = path.join(userDataPath, 'pets.db')

const sourceDbPath = path.join(process.resourcesPath, 'pets.db')

if (!fs.existsSync(dbPath)) {
  fs.copyFileSync(sourceDbPath, dbPath)
}

const dbUrl = pathToFileURL(dbPath).href

const client = createClient({
  url: dbUrl,
})

export const db = drizzle(client)

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    title: 'Medvet Formulador',
    webPreferences: {
      preload: getPreloadPath(),
      webSecurity: false,
      devTools: !app.isPackaged,
    },
    width: 1600,
    height: 900,
  })
  Menu.setApplicationMenu(null)

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123')
  } else {
    mainWindow.loadFile(getUIPath())
  }
  ipcMainHandle('submit', savePetProfile)
  ipcMainHandle('pickPhoto', pickPhoto)
  ipcMainHandle('getAllPets', getAllPets)
  ipcMainHandle('getPetById', getPetById)
  ipcMainHandle('saveRecipe', saveRecipe)
  ipcMainHandle('getRecipesByPetName', getRecipesByPetName)
  ipcMainHandle('getAllRecipes', getAllRecipes)
})
