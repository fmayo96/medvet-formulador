import { useEffect, useState } from "react"
import type { ChangeEvent } from "react"
import Page from "./Page"
import Title from "./Title"
import Select from "./Select"
import { STANDARDS } from "../data/standards"

interface Food {
  name: string // --> name of the food
  amount: number // --> amount in grams
}

interface Recipe {
  petName: string
  ingredients: Food[]
  date: Date
}

const CreateRecipe = () => {
  const [pets, setPets] = useState<PetInfo[]>()
  const [recipe, setRecipe] = useState<Recipe>({
    petName: "",
    ingredients: [],
    date: new Date(),
  })
  async function getPets() {
    const allPets = await window.electron.getAllPets()
    setPets(allPets)
  }

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }))
  }

  useEffect(() => {
    getPets()
  }, [pets])

  return (
    <Page>
      <Title content="Crear Receta" />
      <Select
        label="Nombre del Animal"
        name="petName"
        value={recipe.petName}
        onChange={handleSelect}
      >
        {pets?.map((p) => (
          <option>{p.name}</option>
        ))}
      </Select>
      <div
        className=" w-full overflow-auto items-end"
        style={{ scrollbarWidth: "none" }}
      >
        {Object.entries(STANDARDS.recommended["NRC Perro Adulto"]).map(
          ([k]) => (
            <p>{k}</p>
          )
        )}
      </div>
    </Page>
  )
}
export default CreateRecipe
