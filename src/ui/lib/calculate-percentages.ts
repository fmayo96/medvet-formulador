import type { Total } from '../components/CreateRecipe'
import { MACROS } from '../data/macros'

export function calculateCaloriesPercentage(total: Total) {
  const carbs = total['Carbohidratos, por diferencia'] * 4
  const protein = total['Proteína'] * 4
  const fat = total['Lípidos totales (grasas)'] * 9

  const energy = carbs + protein + fat

  const percentages = [
    (protein / energy) * 100,
    (fat / energy) * 100,
    (carbs / energy) * 100,
  ]

  if (energy === 0) return [100, 0, 0]

  return percentages
}

export function calculateDMPercentage(total: Total) {
  const DM = total['Materia seca']
  const protein = total['Proteína']
  const fat = total['Lípidos totales (grasas)']
  const carbs = total['Carbohidratos, por diferencia']
  const ash = total['Ceniza']

  const percentages = [
    (protein / DM) * 100,
    (fat / DM) * 100,
    (carbs / DM) * 100,
    (1 - (protein + fat + carbs + ash) / DM) * 100,
    (ash / DM) * 100,
  ]

  if (DM === 0) return [100, 0, 0, 0, 0]

  return percentages
}

export function calculateDMPercentageAll(total: Total) {
  const percentages = { ...total }
  const DM = total['Materia seca']
  for (let i = 0; i < MACROS.length; i++) {
    let key = MACROS[i].nombre
    let unidad = MACROS[i].unidad

    switch (unidad) {
      case 'g':
        percentages[key] = (total[key] / DM) * 100
        break
      case 'mg':
        percentages[key] = (total[key] / (1000 * DM)) * 100
        break
      case 'µg':
        percentages[key] = (total[key] / (1000 * 1000 * DM)) * 100
    }
  }
  return percentages
}
