import type { ReactNode, MouseEvent } from 'react'

interface Props {
  children: ReactNode
  type: 'light' | 'dark'
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ children, type, onClick }: Props) => {
  let cssClasses =
    'border-2 w-30 h-fit p-2 rounded-md bg-[#75578F] text-white hover:cursor-pointer hover:bg-[#75578F]/80 '

  if (type === 'light') {
    cssClasses =
      'bg-white  w-30 p-2 rounded-md text-[#75578F] border-2 border-[#75578F] hover:cursor-pointer hover:bg-[#BFA8D4]/10'
  }

  return (
    <button
      className={cssClasses}
      onClick={(e: MouseEvent<HTMLButtonElement>) => onClick(e)}
    >
      {children}
    </button>
  )
}
export default Button
