import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const petsTable = sqliteTable('pets_table', {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    age: int().notNull(),
    weight: int().notNull(),
    species: text().notNull(),
    numCachorros: int().notNull(),
    lactancyWeel: int().notNull(),
    hasBlackFurr: int('has_black_furr', { mode: 'boolean' })
        .notNull()
        .default(false),
    isCatOverweight: int('is_cat_overweight', { mode: 'boolean' })
        .notNull()
        .default(false),
    estimatedEnergyFactor: int().notNull(),
    isIdealWeight: int('is_ideal_weight', { mode: 'boolean' })
        .notNull()
        .default(false),
    idealWeight: int().notNull(),
    useRecommendedCaloricIntake: int('use_recommended_caolirc_intake', {
        mode: 'boolean',
    })
        .notNull()
        .default(true),
    recommendedCaloricIntake: int().notNull(),
    customCaloricIntake: int().notNull(),
    otherNotes: text(),
});
