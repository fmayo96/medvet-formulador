import type { ReactNode, MouseEvent } from 'react'

interface Props {
  children: ReactNode
  type: 'light' | 'dark'
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ children, type, onClick }: Props) => {
  let cssClasses =
    'border-2 w-30 h-fit p-2 rounded-md bg-sky-600 text-white hover:cursor-pointer hover:bg-sky-700 hover:text-sky-100'

  if (type === 'light') {
    cssClasses =
      'text-sky-700 border-2 w-30 p-2 rounded-md hover:bg-sky-100 hover:cursor-pointer hover:text-sky-600'
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
