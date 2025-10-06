import type { Total } from '../components/CreateRecipe'
import { INIT_TOTAL } from '../components/CreateRecipe'
import { FOOD_DB } from '../data/food_db'
import { MACROS } from '../data/macros'

export function calculateTotal(recipe: Recipe): Total {
  const newTotal = { ...INIT_TOTAL }
  for (let r of recipe.ingredients) {
    let food = FOOD_DB.find((f) => f['Nombre'] === r.name)
    if (!food) continue
    for (let macro of MACROS.filter((m) => m.nombre !== 'Tamaño Porción')) {
      // @ts-expect-error
      const nutrient = Number(food[macro.nombre])
      if (Number.isNaN(nutrient)) continue
      if (!Number.isNaN(Number(food['Tamaño Porción']))) {
        newTotal[macro.nombre] +=
          (nutrient * r.amount) / Number(food['Tamaño Porción'])
      } else {
        newTotal[macro.nombre] += nutrient * r.amount
      }
    }
    newTotal['Materia seca'] =
      newTotal['Ceniza'] +
      newTotal['Proteína'] +
      newTotal['Lípidos totales (grasas)'] +
      newTotal['Carbohidratos, por diferencia'] +
      newTotal['Fibra, total']

    newTotal['Materia seca ajustada'] = newTotal['Energía'] / 4.0
  }
  return newTotal
}
