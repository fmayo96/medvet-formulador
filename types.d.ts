interface Window {
  electron: { hi: (data) => Promise<string> }
}

type EventPayloadMapping = {
  hi: string
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

type PetData = {
  name: string
  photo: File | null
  age: number
  weight: number
  species: Species
  numCachorros: number
  lactancyWeek: 1 | 2 | 3 | 4
  hasBlackFurr: boolean
  isCatOverweight: boolean
  estimatedEnergyFactor: number
  isIdealWeight: boolean
  idealWeight: number
  useRecommendedCaloricIntake: boolean // true for calculated value
  recommendedCaloricIntake: number // use this if useRecommendedCaloricIntake === false
  customCaloricIntake: number
  otherNotes: string
}
