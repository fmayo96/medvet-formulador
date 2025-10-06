import type { Total } from '../components/CreateRecipe'

export function calculateCaloriesPercentage(total: Total) {
  const energy = total['Energía']
  const protein = total['Proteína'] * 4
  const fat = total['Lípidos totales (grasas)'] * 9

  const percentages = [
    (protein / energy) * 100,
    (fat / energy) * 100,
    (1 - (fat + protein) / energy) * 100,
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
