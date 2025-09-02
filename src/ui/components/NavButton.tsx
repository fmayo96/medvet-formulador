import { Routes } from '../store/page-context'

type NavButtonProps = {
  name: string
  isSelected: boolean
  id: Routes
  onSelect: (id: Routes) => void
}

const NavButton = ({ name, isSelected, id, onSelect }: NavButtonProps) => {
  let cssClasses =
    'my-2 text-lg hover:bg-slate-200 w-7/8 rounded-md py-2 hover:cursor-pointer '
  if (isSelected) {
    cssClasses += 'bg-slate-100'
  }
  return (
    <button onClick={() => onSelect(id)} className={cssClasses}>
      {name}
    </button>
  )
}
export default NavButton
