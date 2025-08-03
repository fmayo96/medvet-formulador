const electron = require("electron")

electron.contextBridge.exposeInMainWorld("electron", {
  hi: () => electron.ipcRenderer.invoke("hi"),
} satisfies Window["electron"])
