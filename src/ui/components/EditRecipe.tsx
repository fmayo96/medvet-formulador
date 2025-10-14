import { useContext, useEffect, useState } from 'react'
import { PageContext, Routes } from '../store'
import { FOOD_DB } from '../data/food_db'
import { MACROS } from '../data/macros'
import { STANDARDS } from '../data/standards_es'
import {
  calculateCaloriesPercentage,
  calculateDMPercentage,
  calculateRequirements,
  calculateTotal,
} from '../lib'
import Button from './Button'
import FoodSelector from './FoodSelector'
import Ingredient from './Ingredient'
import MacrosTable from './MacrosTable'
import Page from './Page'
import PieChart from './PieChart'
import SmallCard from './SmallCard'
import Title from './Title'

const EXAMPLE_DATA = {
  labels: ['Proteína', 'Grasa', 'Carbohidratos'],
  datasets: [
    {
      data: [100, 0, 0],
      backgroundColor: ['#6B9DA6', '#75578F', '#E9FFB1'],
    },
  ],
}

const EXAMPLE_DATA_DM = {
  labels: ['Proteína', 'Grasa', 'Carbohidratos', 'Fibra', 'Ceniza'],
  datasets: [
    {
      data: [100, 0, 0, 0, 0],
      backgroundColor: ['#6B9DA6', '#75578F', '#E9FFB1', '#BFA8D4', '#A7D7DD'],
    },
  ],
}

export const INIT_TOTAL = Object.fromEntries(MACROS.map((m) => [m.nombre, 0]))
export type Total = typeof INIT_TOTAL

let REQUIREMENTS = Object.fromEntries(
  Object.keys(STANDARDS.recomendado['Perro Adulto']).map((k) => [k, 0])
)

export type Requirements = typeof REQUIREMENTS

const FOODS: Food[] = FOOD_DB.map(
  (f) =>
    ({
      name: f['Nombre'],
      amount: 0,
      unidad: f['Tamaño Porción'] === 100 ? 'g' : f['Tamaño Porción'],
    } as Food)
)

interface Props {
  petId: number
  recipeId: number
  createNew: boolean
}

const EditRecipe = ({ petId, recipeId, createNew }: Props) => {
  const [selectedPet, setSelectedPet] = useState<PetDTO>()
  const [recipe, setRecipe] = useState<Recipe>()
  const [total, setTotal] = useState(INIT_TOTAL)
  const [addFood, setAddFood] = useState(false)
  const [caloriesPercentagesData, setCaloriesPercentagesData] =
    useState(EXAMPLE_DATA)
  const [DMPercentagesData, setDMPercentagesData] = useState(EXAMPLE_DATA_DM)

  const { changeRoute, changePetId } = useContext(PageContext)

  const handleSetAddFood = () => setAddFood((prev) => !prev)

  async function getPetandPrevRecipe() {
    const [pet] = await window.electron.getPetById(petId)
    const prevRecipe = await window.electron.getRecipeById(recipeId)
    setSelectedPet(pet)
    const newRecipe = {
      petName: pet.name,
      ingredients: prevRecipe.ingredients,
      date: new Date(prevRecipe.date),
    }
    if (createNew) newRecipe.date = new Date()
    console.log(newRecipe)
    setRecipe(newRecipe)
    const newTotal = calculateTotal(newRecipe)
    setTotal(newTotal)

    REQUIREMENTS = calculateRequirements(pet, total)
    setCaloriesPercentagesData((prev) => ({
      ...prev,
      datasets: [
        {
          data: calculateCaloriesPercentage(newTotal),
          backgroundColor: ['#6B9DA6', '#75578F', '#E9FFB1'],
        },
      ],
    }))
    setDMPercentagesData((prev) => ({
      ...prev,
      datasets: [
        {
          data: calculateDMPercentage(newTotal),
          backgroundColor: [
            '#6B9DA6',
            '#75578F',
            '#E9FFB1',
            '#BFA8D4',
            '#A7D7DD',
          ],
        },
      ],
    }))
  }

  function handleAddFood(food: Food) {
    const newRecipe = {
      ...recipe!,
      ingredients: [...recipe!.ingredients, food],
    }
    setRecipe(newRecipe)
    const newTotal = calculateTotal(newRecipe)
    setTotal(newTotal)
    REQUIREMENTS = calculateRequirements(selectedPet!, newTotal)
    setCaloriesPercentagesData((prev) => ({
      ...prev,
      datasets: [
        {
          data: calculateCaloriesPercentage(newTotal),
          backgroundColor: ['#6B9DA6', '#75578F', '#E9FFB1'],
        },
      ],
    }))
    setDMPercentagesData((prev) => ({
      ...prev,
      datasets: [
        {
          data: calculateDMPercentage(newTotal),
          backgroundColor: [
            '#6B9DA6',
            '#75578F',
            '#E9FFB1',
            '#BFA8D4',
            '#A7D7DD',
          ],
        },
      ],
    }))
  }

  function handleDelete(name: string) {
    const newRecipe = {
      ...recipe!,
      ingredients: recipe!.ingredients.filter((i) => i.name !== name),
    }
    setRecipe(newRecipe)
    const newTotal = calculateTotal(newRecipe)
    setTotal(newTotal)
    REQUIREMENTS = calculateRequirements(selectedPet!, newTotal)
    setCaloriesPercentagesData((prev) => ({
      ...prev,
      datasets: [
        {
          data: calculateCaloriesPercentage(newTotal),
          backgroundColor: ['#6B9DA6', '#75578F', '#E9FFB1'],
        },
      ],
    }))
    setDMPercentagesData((prev) => ({
      ...prev,
      datasets: [
        {
          data: calculateDMPercentage(newTotal),
          backgroundColor: [
            '#6B9DA6',
            '#75578F',
            '#E9FFB1',
            '#BFA8D4',
            '#A7D7DD',
          ],
        },
      ],
    }))
  }

  function handleAmountChange(name: string, amount: number) {
    const newIngredients = [...recipe!.ingredients]
    const idx = newIngredients.findIndex((i) => i.name === name)
    newIngredients[idx].amount = amount
    const newRecipe = { ...recipe!, ingredients: newIngredients }
    setRecipe(newRecipe)
    const newTotal = calculateTotal(newRecipe)
    setCaloriesPercentagesData((prev) => ({
      ...prev,
      datasets: [
        {
          data: calculateCaloriesPercentage(newTotal),
          backgroundColor: ['#6B9DA6', '#75578F', '#E9FFB1'],
        },
      ],
    }))
    setDMPercentagesData((prev) => ({
      ...prev,
      datasets: [
        {
          data: calculateDMPercentage(newTotal),
          backgroundColor: [
            '#6B9DA6',
            '#75578F',
            '#E9FFB1',
            '#BFA8D4',
            '#A7D7DD',
          ],
        },
      ],
    }))
    REQUIREMENTS = calculateRequirements(selectedPet!, newTotal)
    setTotal(newTotal)
  }

  async function handleSave() {
    if (createNew) {
      await window.electron.saveRecipe(recipe!)
      if (changePetId) changePetId(selectedPet!.id)
      if (changeRoute) changeRoute(Routes.PET_PROFILE)
    } else {
      await window.electron.updateRecipe({
        id: recipeId,
        ingredients: recipe!.ingredients,
      })
      if (changePetId) changePetId(selectedPet!.id)
      if (changeRoute) changeRoute(Routes.PET_PROFILE)
    }
  }

  useEffect(() => {
    getPetandPrevRecipe()
  }, [])

  return (
    <Page>
      <Title content="Editar receta" />
      <div className="flex flex-row gap-4 w-full">
        <div className="flex-[2] flex flex-col w-full min-w-[400px] h-[80vh] border-r-2 border-slate-200  pr-8 items-center my-4 gap-4 overflow-y-auto">
          <div className="flex flex-col items-center gap-2">
            {selectedPet && <SmallCard pet={selectedPet} />}
          </div>
          {!addFood ? (
            <div className="flex gap-4">
              <Button type="dark" onClick={handleSetAddFood}>
                + Alimento
              </Button>
              <Button type="light" onClick={handleSave}>
                Guardar
              </Button>
            </div>
          ) : (
            <FoodSelector
              foods={FOODS}
              onAdd={handleAddFood}
              onClose={handleSetAddFood}
            />
          )}
          <div className="flex flex-col items-center w-full">
            {recipe &&
              recipe.ingredients.map((i, idx) => (
                <Ingredient
                  key={idx}
                  name={i.name}
                  amount={i.amount}
                  unit={i.unidad}
                  onDelete={handleDelete}
                  onChange={handleAmountChange}
                />
              ))}
          </div>
        </div>
        <div className="flex-[3] flex flex-col h-[84vh]">
          <div className="overflow-y-auto border-b-2 border-slate-200 pb-1 px-2 flex justify-center mb-2">
            {selectedPet && (
              <MacrosTable
                total={total}
                REQUIREMENTS={REQUIREMENTS}
                selectedPet={selectedPet}
              />
            )}
          </div>
          <div className="flex justify-evenly items-start">
            <PieChart title="Calorías" data={caloriesPercentagesData} />
            <PieChart title="Materia Seca" data={DMPercentagesData} />
          </div>
        </div>
      </div>
    </Page>
  )
}
export default EditRecipe
