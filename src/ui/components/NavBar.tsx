import NavButton from './NavButton'
import logoMedvet from '../assets/logo-medvet.png'
import { useContext } from 'react'
import { PageContext, Routes } from '../store/page-context'

const NavBar = () => {
  const pages: { id: Routes; name: string }[] = [
    { id: Routes.CREATE_PROFILE, name: 'Crear Perfil' },
    { id: Routes.SAVED_PROFILES, name: 'Perfiles Guardados' },
    { id: Routes.CREATE_RECIPE, name: 'Crear Receta' },
  ]

  const { route, changeRoute } = useContext(PageContext)

  return (
    <nav className="w-1/4 h-screen text-center flex flex-col justify-between pt-8 gap-2 border-r-2 border-r-slate-200">
      <div className="flex align-middle justify-center gap-4">
        <div className="w-20 overflow-hidden">
          <img
            src={logoMedvet}
            alt="logo de Medvet"
            className="w-full object-cover"
          />
        </div>
        <h1 className="text-3xl mb-4 pt-4">Formulador</h1>
      </div>

      <hr className="border-slate-200 mx-4 my-2" />
      <div className="flex flex-col items-center">
        <hr className="border-slate-200 mx-4 " />
        {pages.map((p) => (
          <NavButton
            key={p.id}
            onSelect={changeRoute!}
            name={p.name}
            isSelected={p.id === route}
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
  )
}
export default NavBar
