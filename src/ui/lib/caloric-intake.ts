const LvalsBitch = [0.75, 0.95, 1.1, 1.2];
const LvalsQueen = [0.9, 0.9, 1.2, 1.2, 1.1, 1.0, 0.8];

export function calculateCaloricIntake(pet: PetData): number {
  switch (pet.species) {
    case "Perro Adulto":
      return Math.round(pet.estimatedEnergyFactor * Math.pow(pet.weight, 0.75));
    case "Gato Adulto": {
      return pet.isCatOverweight
        ? Math.round(pet.estimatedEnergyFactor * Math.pow(pet.weight, 0.4))
        : Math.round(pet.estimatedEnergyFactor * Math.pow(pet.weight, 0.67));
    }
    case "Perro Cachorro":
      return Math.round(
        pet.estimatedEnergyFactor *
        Math.pow(pet.weight, 0.75) *
        3.2 *
        Math.exp((-0.87 * pet.weight) / pet.adultWeight),
      );
    case "Gato Cachorro":
      return Math.round(
        pet.estimatedEnergyFactor *
        Math.pow(pet.weight, 0.67) *
        6.7 *
        (Math.exp((-0.189 * pet.weight) / pet.adultWeight) - 0.66),
      );
    case "Perra Pre\u00F1ada":
      return Math.round(
        pet.estimatedEnergyFactor * Math.pow(pet.weight, 0.75) +
        26 * pet.weight,
      );
    case "Gata Pre\u00F1ada":
      return Math.round(
        pet.estimatedEnergyFactor * 1.4 * Math.pow(pet.weight, 0.67),
      );
    case "Perra Lactancia": {
      const n = Math.min(pet.numCachorros, 4);
      const m = Math.max(pet.numCachorros - 4, 0);

      return Math.round(
        pet.estimatedEnergyFactor * Math.pow(pet.weight, 0.75) +
        pet.weight * (24 * n + 12 * m) * LvalsBitch[pet.lactancyWeek - 1],
      );
    }
    case "Gata Lactancia": {
      if (pet.numCachorros < 3) {
        return Math.round(
          pet.estimatedEnergyFactor * Math.pow(pet.weight, 0.67) +
          18 * pet.weight * LvalsQueen[pet.lactancyWeek - 1],
        );
      } else if (pet.numCachorros >= 3 && pet.numCachorros < 5) {
        return Math.round(
          pet.estimatedEnergyFactor * Math.pow(pet.weight, 0.67) +
          60 * pet.weight * LvalsQueen[pet.lactancyWeek - 1],
        );
      } else {
        return Math.round(
          pet.estimatedEnergyFactor * Math.pow(pet.weight, 0.67) +
          70 * pet.weight * LvalsQueen[pet.lactancyWeek - 1],
        );
      }
    }
    default:
      return 0;
  }
}
