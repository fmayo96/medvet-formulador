import electron from "electron"

electron.contextBridge.exposeInMainWorld("electron", {
  hi: (data: any) => ipcInvoke("hi", data),
} satisfies Window["electron"])

function ipcInvoke<Key extends keyof EventPayloadMapping, Arg>(
  key: Key,
  arg: Arg
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key, arg)
}
