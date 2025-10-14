import { date } from 'drizzle-orm/mysql-core'
import { recipesTable } from '../db/schema.js'
import { db } from '../main.js'
import { desc, eq } from 'drizzle-orm'

export async function saveRecipe(recipe: Recipe) {
  const newRecipe: typeof recipesTable.$inferInsert = {
    petName: recipe.petName,
    ingredients: recipe.ingredients,
    date: recipe.date.toLocaleDateString('es-Ar'),
  }
  await db.insert(recipesTable).values(newRecipe)
}

export async function updateRecipe({
  id,
  ingredients,
}: {
  id: number
  ingredients: Food[]
}) {
  await db
    .update(recipesTable)
    .set({ ingredients: ingredients })
    .where(eq(recipesTable.id, id))
}

export async function deleteRecipeById(id: number) {
  await db.delete(recipesTable).where(eq(recipesTable.id, id))
}

export async function getRecipesByPetName(name: string) {
  const recipes = await db
    .select()
    .from(recipesTable)
    .where(eq(recipesTable.petName, name))
    .orderBy(desc(recipesTable.date))
  return recipes as RecipeDTO[]
}

export async function getAllRecipes() {
  const recipes = await db.select().from(recipesTable)
  return recipes as RecipeDTO[]
}

export async function getRecipeById(id: number) {
  const recipe = await db
    .select()
    .from(recipesTable)
    .where(eq(recipesTable.id, id))
  if (recipe.length !== 1) throw new Error('Recipe not found')
  return recipe[0] as RecipeDTO
}
