import { sql } from 'drizzle-orm'
import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const petsTable = sqliteTable('pets_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  imgPath: text(),
  age: int().notNull(),
  weight: real().notNull(),
  metabolicWeight: real().notNull(),
  adultWeight: int().notNull(),
  species: text().notNull(),
  numCachorros: int().notNull(),
  lactancyWeek: int(),
  hasBlackFurr: int('has_black_furr', { mode: 'boolean' }).notNull(),
  isCatOverweight: int('is_cat_overweight', { mode: 'boolean' }),
  estimatedEnergyFactor: int().notNull(),
  isIdealWeight: int('is_ideal_weight', { mode: 'boolean' }).notNull(),
  idealWeight: int().notNull(),
  recommendedCaloricIntake: int().notNull(),
  protein: int().notNull(),
  fat: int().notNull(),
  carbs: int().notNull(),
  fiber: int().notNull(),
  otherNotes: text(),
})

export const recipesTable = sqliteTable('recipes_table', {
  id: int().primaryKey({ autoIncrement: true }),
  petName: text('pet_name'),
  ingredients: text('ingredients', { mode: 'json' }).$type<Food[]>(),
  date: text('date')
    .notNull()
    .default(sql`(current_timestamp)`),
})
