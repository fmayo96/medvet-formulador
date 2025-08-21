import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const petsTable = sqliteTable("pets_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  imgPath: text(),
  age: int().notNull(),
  weight: int().notNull(),
  adultWeight: int().notNull(),
  species: text().notNull(),
  numCachorros: int().notNull(),
  lactancyWeek: int(),
  hasBlackFurr: int("has_black_furr", { mode: "boolean" }).notNull(),
  isCatOverweight: int("is_cat_overweight", { mode: "boolean" }),
  estimatedEnergyFactor: int().notNull(),
  isIdealWeight: int("is_ideal_weight", { mode: "boolean" }).notNull(),
  idealWeight: int().notNull(),
  useRecommendedCaloricIntake: int("use_recommended_caloric_intake", {
    mode: "boolean",
  }).notNull(),
  recommendedCaloricIntake: int().notNull(),
  customCaloricIntake: int().notNull(),
  otherNotes: text(),
});
