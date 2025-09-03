import { useReducer, useContext, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import { PageContext, Routes } from "../store";
import {
  petReducer,
  validateMacronutrients,
  calculateCaloricIntake,
} from "../lib";

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
  protein: 40,
  fat: 30,
  carbs: 30,
  fiber: 3,
  otherNotes: "",
};

const PetForm = () => {
  const [petData, dispatch] = useReducer(petReducer, INITIAL_PET);
  const { changeRoute } = useContext(PageContext);
  const [macroError, setMacroError] = useState<string>();

  const recommendedCaloricIntake = calculateCaloricIntake(petData);

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
    setMacroError(undefined);
    if (!validateMacronutrients(petData)) {
      setMacroError(
        "Los porcentajes de proteina, grasa y carbohidratos deben sumar 100.",
      );
      return;
    }
    await window.electron.submit({
      ...petData,
      recommendedCaloricIntake: recommendedCaloricIntake,
    });
    if (changeRoute) changeRoute(Routes.SAVED_PROFILES);
  }
  return (
    <form
      className="flex flex-col w-full overflow-auto"
      style={{ scrollbarWidth: "none" }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // stop form submission
        }
      }}
    >
      <h2 className="text-xl my-8 self-center font-medium">Datos del Animal</h2>
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

      <div className="grid grid-cols-[3fr_1fr] gap-8">
        <div className="flex flex-col">
          <h2 className="text-xl mt-4 mb-8 self-center font-medium">
            Requerimientos Energéticos
          </h2>
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
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl mt-4 mb-8 self-center font-medium">
            Objetivos de Macronutrientes
          </h2>
          <div className="flex justify-between">
            <label className="text-lg">Proteina:</label>{" "}
            <div className="flex">
              <input
                type="text"
                name="protein"
                id="protein"
                value={petData.protein}
                onChange={handleNumChange}
                className="text-end text-lg focus:outline-0"
              />
              <p className="text-lg">%</p>
            </div>
          </div>
          <input
            type="range"
            name="protein"
            id="protein"
            min={0}
            max={100}
            value={petData.protein}
            onChange={handleNumChange}
            className="bg-transparent accent-sky-600"
          />
          <div className="flex justify-between">
            <label className="text-lg">Grasa:</label>{" "}
            <div className="flex">
              <input
                type="text"
                name="fat"
                id="fat"
                value={petData.fat}
                onChange={handleNumChange}
                className="text-end text-lg focus:outline-0"
              />
              <p className="text-lg">%</p>
            </div>
          </div>
          <input
            type="range"
            name="fat"
            id="fat"
            min={0}
            max={100}
            value={petData.fat}
            onChange={handleNumChange}
            className="bg-transparent accent-sky-600"
          />
          <div className="flex justify-between">
            <label className="text-lg">Carbohidratos:</label>{" "}
            <input
              type="text"
              name="carbs"
              id="carbs"
              value={petData.carbs}
              onChange={handleNumChange}
              className="text-end text-lg focus:outline-0"
            />
            <p className="text-lg">%</p>
          </div>
          <input
            type="range"
            name="carbs"
            id="carbs"
            min={0}
            max={100}
            value={petData.carbs}
            onChange={handleNumChange}
            className="bg-transparent accent-sky-600"
          />
          <div className="flex justify-between">
            <label className="text-lg">Fibra (%DMB):</label>{" "}
            <input
              type="text"
              name="fiber"
              id="fiber"
              value={petData.fiber}
              onChange={handleNumChange}
              className="text-end text-lg focus:outline-0"
            />
            <p className="text-lg">%</p>
          </div>
          <input
            type="range"
            name="fiber"
            id="fiber"
            min={0}
            max={100}
            value={petData.fiber}
            onChange={handleNumChange}
            className="bg-transparent accent-sky-600"
          />

          {macroError && (
            <p className="text-red-400 border-red-400 bg-red-100 px-2 font-semibold border-1 rounded-md">
              {macroError}
            </p>
          )}
        </div>
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
        <div className="flex gap-2">
          <Button type="light" onClick={handleImageClick}>
            Subir imagen
          </Button>
          {petData.imgPath && (
            <img
              src={`file://${petData.imgPath}`}
              alt="selected image"
              className="w-12 h-12"
            />
          )}
        </div>
        <Button type="dark" onClick={handleSubmit}>
          Crear perfil
        </Button>
      </div>
    </form>
  );
};
export default PetForm;
