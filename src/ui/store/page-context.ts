import { createContext } from 'react'

export enum Routes {
  'CREATE_PROFILE' = 1,
  'SAVED_PROFILES' = 2,
  'CREATE_RECIPE' = 3,
  'PET_PROFILE' = 4,
  'EDIT_REIPE' = 5,
}

interface PageCtx {
  route: Routes
  changeRoute?: (route: Routes) => void
  petId?: number
  recipeId?: number
  createNew: boolean
  changePetId?: (id: number) => void
  changeRecipeId?: (id: number) => void
  changeCreateNew?: (value: boolean) => void
}

export const PageContext = createContext<PageCtx>({
  route: Routes.CREATE_PROFILE,
  petId: undefined,
  recipeId: undefined,
  createNew: false,
})
