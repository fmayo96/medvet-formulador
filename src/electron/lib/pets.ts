import { petsTable } from '../db/schema.js'
import { db } from '../main.js'
import path from 'path'
import { promises as fs } from 'fs'
import { app } from 'electron'
import { eq } from 'drizzle-orm'

export async function savePetProfile(pet: PetData) {
  if (pet.imgPath === null) {
    const newPet: typeof petsTable.$inferInsert = {
      name: pet.name,
      age: pet.age,
      imgPath: null,
      weight: pet.weight,
      adultWeight: pet.adultWeight,
      recommendedCaloricIntake: pet.recommendedCaloricIntake,
      useRecommendedCaloricIntake: pet.useRecommendedCaloricIntake,
      customCaloricIntake: pet.customCaloricIntake,
      species: pet.species,
      estimatedEnergyFactor: pet.estimatedEnergyFactor,
      numCachorros: pet.numCachorros,
      lactancyWeek: pet.lactancyWeek,
      isCatOverweight: pet.isCatOverweight,
      isIdealWeight: pet.isIdealWeight,
      idealWeight: pet.idealWeight,
      hasBlackFurr: pet.hasBlackFurr,
      otherNotes: pet.otherNotes,
    }

    await db.insert(petsTable).values(newPet)
  }
  const sourcePath = pet.imgPath!
  const extension = pet.imgPath!.split('.').pop()
  const destFileName = `${pet.name.toLowerCase()}.${extension}`
  const destFolder = path.join(app.getPath('userData'), 'images')
  const destPath = path.join(app.getPath('userData'), 'images', destFileName)

  try {
    fs.mkdir(destFolder, { recursive: true })
    await fs.copyFile(sourcePath, destPath)
  } catch (error) {
    console.error(error)
  }
  const newPet: typeof petsTable.$inferInsert = {
    name: pet.name,
    age: pet.age,
    imgPath: destPath,
    weight: pet.weight,
    adultWeight: pet.adultWeight,
    recommendedCaloricIntake: pet.recommendedCaloricIntake,
    useRecommendedCaloricIntake: pet.useRecommendedCaloricIntake,
    customCaloricIntake: pet.customCaloricIntake,
    species: pet.species,
    estimatedEnergyFactor: pet.estimatedEnergyFactor,
    numCachorros: pet.numCachorros,
    lactancyWeek: pet.lactancyWeek,
    isCatOverweight: pet.isCatOverweight,
    isIdealWeight: pet.isIdealWeight,
    idealWeight: pet.idealWeight,
    hasBlackFurr: pet.hasBlackFurr,
    otherNotes: pet.otherNotes,
  }

  await db.insert(petsTable).values(newPet)
}

export async function getAllPets() {
  const pets = await db
    .select({
      id: petsTable.id,
      name: petsTable.name,
      imgPath: petsTable.imgPath,
      age: petsTable.age,
      weight: petsTable.weight,
      species: petsTable.species,
    })
    .from(petsTable)
  return pets as PetInfo[]
}

export async function getPetById(id: number) {
  const pet = await db.select().from(petsTable).where(eq(petsTable.id, id))
  return pet as PetDTO[]
}
