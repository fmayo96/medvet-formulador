import electron from 'electron'

electron.contextBridge.exposeInMainWorld('electron', {
  submit: (pet: PetData) => ipcInvoke('submit', pet),
  pickPhoto: () => electron.ipcRenderer.invoke('pickPhoto'),
  getAllPets: () => electron.ipcRenderer.invoke('getAllPets'),
  getPetById: (id: number) => ipcInvoke('getPetById', id),
} satisfies Window['electron'])

function ipcInvoke<Key extends keyof EventPayloadMapping, Arg>(
  key: Key,
  arg: Arg
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key, arg)
}
