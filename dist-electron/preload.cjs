"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
    hi: () => electron.ipcRenderer.invoke("hi"),
});
