import NavButton from "./NavButton";
import logoMedvet from "../assets/logo-medvet.png";
import { useContext } from "react";
import { PageContext, SelectedButton } from "../store/page-context";

export default function NavBar() {
  const pages: { id: SelectedButton; name: string }[] = [
    { id: SelectedButton.CREATE_PROFILE, name: "Crear Perfil" },
    { id: SelectedButton.SAVED_PROFILES, name: "Perfiles Guardados" },
    { id: SelectedButton.CREATE_RECIPE, name: "Crear Receta" },
  ];

  const { buttonId, changeButtonId } = useContext(PageContext);

  return (
    <nav className="w-1/4 h-screen text-center flex flex-col justify-between pt-8 gap-2 border-r-2 border-r-slate-200">
      <div className="flex align-middle justify-center gap-4">
        <img src={logoMedvet} alt="logo de Medvet" width={80} />
        <h1 className="text-3xl mb-4 pt-4">Formulador</h1>
      </div>

      <hr className="border-slate-200 mx-4 my-2" />
      <div className="flex flex-col items-center">
        <hr className="border-slate-200 mx-4 " />
        {pages.map((p) => (
          <NavButton
            key={p.id}
            onSelect={changeButtonId!}
            name={p.name}
            isSelected={p.id === buttonId}
            id={p.id}
          ></NavButton>
        ))}
        <div className="h-[20rem]"></div>
      </div>
      <div className="flex flex-col py-4">
        <hr className="border-slate-200 mx-4 my-4 " />
        <p>© MedvetPreventiva 2025 </p>
      </div>
    </nav>
  );
}
