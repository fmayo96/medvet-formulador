import { createContext } from 'react'

export enum Routes {
  'CREATE_PROFILE' = 1,
  'SAVED_PROFILES' = 2,
  'CREATE_RECIPE' = 3,
  'PET_PROFILE' = 4,
}

interface PageCtx {
  route: Routes
  changeRoute?: (route: Routes) => void
  petId?: number
  changePetId?: (id: number) => void
}

export const PageContext = createContext<PageCtx>({
  route: Routes.CREATE_PROFILE,
  petId: undefined,
})
