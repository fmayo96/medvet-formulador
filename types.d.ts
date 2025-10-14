interface Window {
  electron: {
    submit: (pet: PetData) => Promise<void>
    pickPhoto: () => Promise<string | null>
    getAllPets: () => Promise<PetDTO[]>
    getPetById: (id: number) => Promise<PetDTO[]>
    saveRecipe: (recipe: Recipe) => Promise<void>
    getRecipesByPetName: (name: string) => Promise<RecipeDTO[]>
    getAllRecipes: () => Promise<RecipeDTO[]>
    updateRecipe: ({
      id,
      ingredients,
    }: {
      id: number
      ingredients: Food[]
    }) => void
    getRecipeById: (id: number) => Promise<RecipeDTO>
    deleteRecipeById: (id: number) => Promise<void>
  }
}

type EventPayloadMapping = {
  submit: void
  pickPhoto: string | null
  getAllPets: PetDTO[]
  getPetById: PetDTO[]
  saveRecipe: void
  getRecipesByPetName: RecipeDTO[]
  getAllRecipes: RecipeDTO[]
  updateRecipe: void
  getRecipeById: RecipeDTO
  deleteRecipeById: void
}

type Species =
  | 'Perro Adulto'
  | 'Gato Adulto'
  | 'Perro Cachorro'
  | 'Gato Cachorro'
  | 'Perra Preñada'
  | 'Gata Preñada'
  | 'Perra Lactancia'
  | 'Gata Lactancia'

interface PetData {
  name: string
  imgPath: string | null
  age: number
  weight: number
  metabolicWeight: number
  adultWeight: number
  species: Species
  numCachorros: number
  lactancyWeek: 1 | 2 | 3 | 4
  hasBlackFurr: boolean
  isCatOverweight: boolean
  estimatedEnergyFactor: number
  isIdealWeight: boolean
  idealWeight: number
  useRecommendedCaloricIntake: boolean // true for calculated value
  recommendedCaloricIntake: number
  customCaloricIntake: number
  protein: number
  fat: number
  carbs: number
  fiber: number
  otherNotes: string
}

interface PetDTO {
  id: number
  name: string
  imgPath: string | null
  age: number
  weight: number
  metabolicWeight: number
  adultWeight: number
  species: Species
  numCachorros: number
  lactancyWeek: 1 | 2 | 3 | 4
  hasBlackFurr: boolean
  isCatOverweight: boolean
  estimatedEnergyFactor: number
  isIdealWeight: boolean
  idealWeight: number
  recommendedCaloricIntake: number
  protein: number
  fat: number
  carbs: number
  fiber: number
  otherNotes: string
}

interface Food {
  name: string // --> name of the food
  amount: number
  unidad: string
}

interface Recipe {
  petName: string
  ingredients: Food[]
  date: Date
}

interface RecipeDTO {
  id: number
  petName: string
  ingredients: Food[]
  date: string
}
