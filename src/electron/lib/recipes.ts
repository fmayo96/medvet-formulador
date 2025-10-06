import { recipesTable } from '../db/schema.js'
import { db } from '../main.js'
import { eq } from 'drizzle-orm'

export async function saveRecipe(recipe: Recipe) {
  const newRecipe: typeof recipesTable.$inferInsert = {
    petName: recipe.petName,
    ingredients: recipe.ingredients,
    date: recipe.date.toDateString(),
  }
  await db.insert(recipesTable).values(newRecipe)
}

export async function getRecipesByPetName(name: string) {
  const recipes = await db
    .select()
    .from(recipesTable)
    .where(eq(recipesTable.petName, name))
  return recipes as RecipeDTO[]
}

export async function getAllRecipes() {
  const recipes = await db.select().from(recipesTable)
  return recipes as RecipeDTO[]
}
