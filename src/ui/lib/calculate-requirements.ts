import { INIT_TOTAL } from '../components/CreateRecipe'
import { STANDARDS } from '../data/standards_es'

let REQUIREMENTS = Object.fromEntries(
  Object.keys(STANDARDS.recomendado['Perro Adulto']).map((k) => [k, 0])
)

type STANDARD_ENTRIES = keyof (typeof STANDARDS.recomendado)['Perro Adulto']

export type Requirements = typeof REQUIREMENTS

export function calculateRequirements(
  selectedPet: PetDTO,
  newTotal: typeof INIT_TOTAL
) {
  let newReq = { ...REQUIREMENTS }
  for (let key in STANDARDS.recomendado[selectedPet.species]) {
    let req =
      STANDARDS.recomendado[selectedPet.species][key as STANDARD_ENTRIES]
        .cantidad

    if (req !== null) {
      if (
        STANDARDS.recomendado[selectedPet.species][key as STANDARD_ENTRIES]
          .unidad !== null
      ) {
        newReq[key as STANDARD_ENTRIES] = req * selectedPet.metabolicWeight
      } else {
        newReq[key as STANDARD_ENTRIES] = req
      }
    }
  }
  newReq['Carbohidratos, por diferencia'] =
    (newTotal['Energía'] * selectedPet.carbs) / 400.0
  newReq['Fibra, total'] =
    (newTotal['Materia seca'] * selectedPet.fiber) / 100.0
  return newReq
}
