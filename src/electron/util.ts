import { ipcMain, WebFrameMain } from "electron"
import { pathToFileURL } from "url"
import { getUIPath } from "./path-resolver.js"

export function isDev(): boolean {
  return process.env.NODE_ENV === "development"
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping, Arg>(
  key: Key,
  handler: (data: Arg) => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, (event, data) => {
    if (event.senderFrame === null) {
      throw new Error("Missing sender Frame.")
    }
    validateEventFrame(event.senderFrame)
    return handler(data)
  })
}

export function validateEventFrame(frame: WebFrameMain) {
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Malicious Event")
  }
}
