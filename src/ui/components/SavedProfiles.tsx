import { useEffect, useState, type ChangeEvent } from "react";

const reCachorro = /Cachorro/;

export default function SavedProfiles() {
  const [pets, setPets] = useState<PetDTO[]>();
  const [search, setSearch] = useState("");
  const filteredPets = pets?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  async function getPets() {
    const allPets = await window.electron.getAllPets();
    setPets(allPets);
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const newSearch = event.target.value;
    setSearch(newSearch);
  }

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div className="w-3/4 p-8 flex flex-col items-center gap-4">
      <h1 className="text-3xl">Perfiles Guardados</h1>
      <hr className="border-1 border-slate-300 w-full my-4" />
      <input
        name="search"
        value={search}
        placeholder="🔎 Buscar animal"
        onChange={handleSearch}
        className="px-4 py-1 my-4 border-1 border-slate-300 rounded-lg focus:outline-none"
      />
      <div className="w-full grid grid-cols-2 gap-4">
        {filteredPets &&
          filteredPets.map((p) => (
            <div
              key={p.id}
              className="flex gap-8  rounded-sm p-4 shadow-slate-300 hover:shadow-slate-500 shadow-sm hover:cursor-pointer mx-4 px-8"
            >
              {p.imgPath && (
                <div className="w-25 h-25 overflow-hidden rounded-full">
                  <img
                    src={`file://${p.imgPath}`}
                    alt="pet image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <p className="text-xl font-semibold">{p.name}</p>
                <p className="text-lg">
                  Edad: {p.age} {reCachorro.test(p.species) ? "meses" : "años"}
                </p>
                <p className="text-lg">Peso: {p.weight} kg</p>
                <p className="text-lg">{p.species}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
