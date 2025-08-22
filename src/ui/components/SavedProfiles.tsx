import { useEffect, useState } from "react";

export default function SavedProfiles() {
  const [pets, setPets] = useState<PetDTO[]>();

  useEffect(() => {
    async function getPets() {
      const allPets = await window.electron.getAllPets();
      setPets(allPets);
    }
    getPets();
  }, []);

  return (
    <div className="w-3/4 p-8 flex flex-col items-center gap-4">
      <h1 className="text-3xl">Perfiles Guardados</h1>
      <ol>
        {pets &&
          pets.map((p) => (
            <div>
              <li key={p.id}>{p.name}</li>
              {p.imgPath && (
                <img
                  src={`file://${p.imgPath}`}
                  alt="pet image"
                  width={100}
                  height={100}
                />
              )}
            </div>
          ))}
      </ol>
    </div>
  );
}
