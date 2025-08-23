import { useReducer, useContext } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import Input from "./Input";
import Select from "./Select";
import { PageContext, SelectedButton } from "../store/page-context";
import { calculateCaloricIntake } from "../lib/caloric-intake";
import Page from "./Page";
import Title from "./Title";
import Button from "./Button";

const reGato = /Gat/;
const reLact = /Lactancia/;
const reCachorro = /Cachorro/;

const INITIAL_PET: PetData = {
  name: "",
  imgPath: null,
  age: 0,
  weight: 0,
  adultWeight: 0,
  species: "Perro Adulto",
  numCachorros: 0,
  lactancyWeek: 1,
  hasBlackFurr: false,
  isCatOverweight: false,
  estimatedEnergyFactor: 0,
  isIdealWeight: false,
  idealWeight: 0,
  useRecommendedCaloricIntake: true, // true for calculated value
  recommendedCaloricIntake: 0,
  customCaloricIntake: 0,
  otherNotes: "",
};

interface Action {
  type: string;
  event?:
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>
    | ChangeEvent<HTMLTextAreaElement>;
  path?: string;
}

export default function CreateProfile() {
  const [petData, dispatch] = useReducer(petReducer, INITIAL_PET);
  const { changeButtonId } = useContext(PageContext);

  const recommendedCaloricIntake = calculateCaloricIntake(petData);

  function petReducer(petData: PetData, action: Action) {
    switch (action.type) {
      case "changeInput": {
        if (action.event!.target.type === "checkbox") {
          const { name, checked } = action.event!.target;
          return {
            ...petData,
            [name]: checked,
          };
        }
        const { name, value } = action.event!.target;
        return { ...petData, [name]: value };
      }
      case "changeNum": {
        const { name, value } = action.event!.target;
        const numValue = Number(value);
        if (Number.isNaN(numValue)) return petData;
        return {
          ...petData,
          [name]: numValue,
        };
      }
      case "changeSelect": {
        const { name, value } = action.event!.target;
        return {
          ...petData,
          [name]: value,
        };
      }
      case "changeImage": {
        return {
          ...petData,
          imgPath: action.path!,
        };
      }
      case "changeTextArea": {
        const { name, value } = action.event!.target;
        return {
          ...petData,
          [name]: value,
        };
      }
      default:
        return petData;
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "changeInput",
      event: event,
    });
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    dispatch({
      type: "changeTextArea",
      event: event,
    });
  }

  function handleNumChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "changeNum",
      event: event,
    });
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: "changeSelect",
      event: event,
    });
  }

  async function handleImageClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const path = await window.electron.pickPhoto();
    if (path === null) return;
    dispatch({
      type: "changeImage",
      path: path,
    });
  }
  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await window.electron.submit({
      ...petData,
      recommendedCaloricIntake: recommendedCaloricIntake,
    });
    if (changeButtonId) changeButtonId(SelectedButton.SAVED_PROFILES);
  }
  return (
    <Page>
      <Title content="Crear Perfil" />
      <form
        className="flex flex-col w-full overflow-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <h2 className="text-xl my-8 self-center font-medium">
          Datos del Animal
        </h2>
        <div className="grid grid-cols-4 gap-8 mb-8">
          <Input
            type="text"
            label="Nombre"
            name="name"
            value={petData.name}
            onChange={handleChange}
          />
          <Select
            label="El animal es"
            name="species"
            value={petData.species}
            onChange={handleSelectChange}
          >
            <option value="Perro Adulto">Perro Adulto</option>
            <option value="Gato Adulto">Gato Adulto</option>
            <option value="Perro Cachorro">Perro Cachorro</option>
            <option value="Gato Cachorro">Gato Cachorro</option>
            <option value="Perra Preñada">Perra Preñada</option>
            <option value="Gata Preñada">Gata Preñada</option>
            <option value="Perra Lactancia">Perra Lactancia</option>
            <option value="Gata Lactancia">Gata Lactancia</option>
          </Select>
          <Input
            label="Peso (kg)"
            name="weight"
            value={petData.weight}
            type="number"
            onChange={handleNumChange}
          />
          <Input
            label={
              reCachorro.test(petData.species) ? "Edad (meses)" : "Edad (años)"
            }
            name="age"
            value={petData.age}
            type="number"
            onChange={handleNumChange}
          />
          <Input
            label="Tiene pelo negro"
            type="checkbox"
            name="hasBlackFurr"
            value={petData.hasBlackFurr}
            onChange={handleChange}
          />
          {reGato.test(petData.species) && (
            <Input
              label="Gato con sobrepeso"
              type="checkbox"
              name="isCatOverweight"
              value={petData.isCatOverweight}
              onChange={handleChange}
            />
          )}
          {reCachorro.test(petData.species) && (
            <Input
              label="Peso de adulto (kg)"
              type="number"
              name="adultWeight"
              value={petData.adultWeight}
              onChange={handleNumChange}
            />
          )}
          {reLact.test(petData.species) ? (
            <Input
              type="number"
              label="Cantidad de cachorros"
              name="numCachorros"
              value={petData.numCachorros}
              onChange={handleChange}
            />
          ) : (
            <p></p>
          )}
          {petData.species === "Perra Lactancia" && (
            <Select
              label="Semana de lactancia"
              name="lactancyWeek"
              value={petData.lactancyWeek}
              onChange={handleSelectChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Select>
          )}
          {petData.species === "Gata Lactancia" && (
            <Select
              label="Semana de lactancia"
              name="lactancyWeek"
              value={petData.lactancyWeek}
              onChange={handleSelectChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </Select>
          )}
        </div>
        <h2 className="text-xl mt-4 mb-8 self-center font-medium">
          Requerimientos Energéticos
        </h2>
        <div className="grid grid-cols-[2fr_1fr] gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Factor de energía estimado"
              type="number"
              name="estimatedEnergyFactor"
              value={petData.estimatedEnergyFactor}
              onChange={handleChange}
            />
            <Input
              label="Está en su peso ideal?"
              type="checkbox"
              name="isIdealWeight"
              value={petData.isIdealWeight}
              onChange={handleChange}
            />
            <Input
              label="Peso ideal (kg)"
              type="text"
              name="idealWeight"
              value={petData.idealWeight}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-1">
              <label className="text-lg">
                Ingesta calórica recomendada (kcal)
              </label>
              <p className="border-1 border-slate-800 py-1 px-2 rounded-md bg-slate-200">
                {recommendedCaloricIntake}
              </p>
            </div>
            <Input
              label="Usar ingesta calórica recomendada"
              type="checkbox"
              name="useRecommendedCaloricIntake"
              value={petData.useRecommendedCaloricIntake}
              onChange={handleChange}
            />
            {!petData.useRecommendedCaloricIntake && (
              <Input
                label="Ingesta calórica personalizada (kcal)"
                type="number"
                name="customCaloricIntake"
                value={petData.customCaloricIntake}
                onChange={handleChange}
              />
            )}
          </div>
          {reGato.test(petData.species) ? (
            <div className="flex flex-col gap-2 bg-sky-50 border-1 border-sky-700 rounded-md p-4 mt-4">
              <h3 className="font-medium text-sky-700">
                Factor de energía estimado: Gatos
              </h3>
              <p className="text-sky-700 text-sm">
                Ingresar el factor de energía estimado para mantener el peso, no
                para subir o bajar.
              </p>
              <p className="text-sky-700 text-sm">
                {"<"}55: Sedentario. Si tiene sobrepeso marcar la checkbox
                arriba.
              </p>
              <p className="text-sky-700 text-sm">
                55-70: Gatos de hogar, parcialmente sedentarios con explosiónes
                breves de energía.
              </p>
              <p className="text-sky-700 text-sm">
                70 - 100: Gatos de hogar activos. Gatos jóvenes y razas
                exóticas.
              </p>
              <p className="text-sky-700 text-sm">
                {">"}100: Gatos muy activos o razas exóticas. Usualmente los
                gatos de exterior o de granero.
              </p>
              <p className="text-sky-700 text-sm">
                La mayoría de los gatos adultos están en 55-80. Excepciones:
                gatos jóvenes o de razas exóticas.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 bg-sky-50  border-1 border-sky-700 rounded-md p-4 mt-4">
              <h3 className="font-medium text-sky-700">
                Factor de energía estimado: Perros
              </h3>
              <p className="text-sky-700 text-sm">
                Ingresar el factor de energía estimado para mantener el peso, no
                para subir o bajar.
              </p>
              <p className="text-sky-700 text-sm">
                {"<"}80: Sedentario. Pueden ser también perros mayores o perros
                activos con metabolismo bajo.
              </p>
              <p className="text-sky-700 text-sm">
                80-95: Mascota normal de hogar. Típicamente perros de mediana
                edad. activos con metabolismo bajo.
              </p>
              <p className="text-sky-700 text-sm">
                95-110: Perros con estilo de vida activo (hiking, deportes, vida
                en granja) o jóvenes.
              </p>
              <p className="text-sky-700 text-sm">
                110-130: Perros de trabajo y adultos jóvenes, especialmente si
                on están castrados.
              </p>
              <p className="text-sky-700 text-sm">
                {" "}
                {">"}130: Perros muy activos (trabajo o deporte en ambientes
                fríos). No muy común.
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full gap-4">
          <p className="font-semibold text-md">Otras notas:</p>
          <textarea
            className="border-1 border-slate-300 p-4 rounded-md resize-none focus:outline-none"
            name="otherNotes"
            rows={8}
            value={petData.otherNotes}
            onChange={handleTextAreaChange}
          />
        </div>
        <div className="flex justify-around items-center w-full mt-12 ">
          <Button type="light" onClick={handleImageClick}>
            Subir imagen
          </Button>
          <Button type="dark" onClick={handleSubmit}>
            Crear perfil
          </Button>
        </div>
      </form>
    </Page>
  );
}
