import electron, { ipcRenderer } from 'electron'

electron.contextBridge.exposeInMainWorld('electron', {
  submit: (pet: PetData) => ipcInvoke('submit', pet),
  pickPhoto: () => electron.ipcRenderer.invoke('pickPhoto'),
  getAllPets: () => electron.ipcRenderer.invoke('getAllPets'),
  getPetById: (id: number) => ipcInvoke('getPetById', id),
  saveRecipe: (recipe: Recipe) => ipcInvoke('saveRecipe', recipe),
  getRecipesByPetName: (name: string) => ipcInvoke('getRecipesByPetName', name),
  getAllRecipes: () => ipcRenderer.invoke('getAllRecipes'),
  updateRecipe: ({ id, ingredients }: { id: number; ingredients: Food[] }) =>
    ipcInvoke('updateRecipe', { id: id, ingredients: ingredients }),
  getRecipeById: (id: number) => ipcInvoke('getRecipeById', id),
  deleteRecipeById: (id: number) => ipcInvoke('deleteRecipeById', id),
} satisfies Window['electron'])

function ipcInvoke<Key extends keyof EventPayloadMapping, Arg>(
  key: Key,
  arg: Arg
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key, arg)
}
