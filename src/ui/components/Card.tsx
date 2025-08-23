const reCachorro = /Cachorro/;

interface CardProps {
  pet: PetDTO;
}

export default function Card({ pet }: CardProps) {
  return (
    <div
      key={pet.id}
      className="flex gap-8  rounded-sm p-4 shadow-slate-300 hover:shadow-slate-500 shadow-sm hover:cursor-pointer mx-4 px-8"
    >
      {pet.imgPath && (
        <div className="w-25 h-25 overflow-hidden rounded-full">
          <img
            src={`file://${pet.imgPath}`}
            alt="pet image"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-xl font-semibold">{pet.name}</p>
        <p className="text-lg">
          Edad: {pet.age} {reCachorro.test(pet.species) ? "meses" : "años"}
        </p>
        <p className="text-lg">Peso: {pet.weight} kg</p>
        <p className="text-lg">{pet.species}</p>
      </div>
    </div>
  );
}
