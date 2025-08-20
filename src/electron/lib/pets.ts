import { petsTable } from "../db/schema.js";
import path from "path";
import fs from "fs";
import { app } from "electron";

export async function savePetProfile(pet: PetData) {
  console.log(pet);

  // const newPet: typeof petsTable.$inferInsert {
  //
  // }
}
