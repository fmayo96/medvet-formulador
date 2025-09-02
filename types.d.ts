interface Window {
  electron: {
    submit: (pet: PetData) => Promise<void>
    pickPhoto: () => Promise<string | null>
    getAllPets: () => Promise<PetInfo[]>
    getPetById: (id: number) => Promise<PetDTO[]>
  }
}

type EventPayloadMapping = {
  submit: void
  pickPhoto: string | null
  getAllPets: PetInfo[]
  getPetById: PetDTO[]
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
  otherNotes: string
}

interface PetInfo {
  id: number
  name: string
  imgPath: string | null
  age: number
  weight: number
  species: Species
}
