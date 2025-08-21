import { petsTable } from "../db/schema.js";
import { db } from "../main.js";
//import path from "path";
//import fs from "fs";
//import { app } from "electron";

export async function savePetProfile(pet: PetData) {
  console.log("db:", db);
  const newPet: typeof petsTable.$inferInsert = {
    name: pet.name,
    age: pet.age,
    imgPath: pet.imgPath,
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
  };

  await db.insert(petsTable).values(newPet);
}

export async function getAllPets() {
  console.log(db);
  const pets = await db.select().from(petsTable);
  return pets as PetDTO[];
}
