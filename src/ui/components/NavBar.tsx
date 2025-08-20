import NavButton from "./NavButton";
import logoMedvet from "../assets/logo-medvet.png";

type SelectedButton = 1 | 2 | 3;

type NavBarProps = {
  selectedButton: SelectedButton;
  onSelect: (buttonId: SelectedButton) => void;
};

export default function NavBar({ selectedButton, onSelect }: NavBarProps) {
  const pages: { id: SelectedButton; name: string }[] = [
    { id: 1, name: "Crear Perfil" },
    { id: 2, name: "Perfiles Guardados" },
    { id: 3, name: "Crear Receta" },
  ];

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
            onSelect={onSelect}
            name={p.name}
            isSelected={p.id === selectedButton}
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
