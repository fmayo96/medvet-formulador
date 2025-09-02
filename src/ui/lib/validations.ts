export function validateMacronutrients(pet: PetData): boolean {
  const total = pet.protein + pet.fat + pet.carbs
  return total === 100
}
