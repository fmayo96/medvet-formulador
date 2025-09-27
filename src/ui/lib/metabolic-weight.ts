const rePerro = /Perr/

export function calculateMetabolicWeight(pet: PetData) {
  if (rePerro.test(pet.species)) {
    return Math.pow(pet.weight, 0.75)
  }
  if (pet.isCatOverweight) {
    return Math.pow(pet.weight, 0.4)
  }
  return Math.pow(pet.weight, 0.67)
}
