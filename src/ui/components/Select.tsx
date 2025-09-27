type Species =
  | 'Perro Adulto'
  | 'Gato Adulto'
  | 'Perro Cachorro'
  | 'Gato Cachorro'
  | 'Perra Preñada'
  | 'Gata Preñada'
  | 'Perra Lactancia'
  | 'Gata Lactancia'

type InputProps = {
  name: string
  value: number | Species | string
  label: string
  children: React.ReactNode
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
}

export default function Select({
  name,
  value,
  label,
  children,
  onChange,
  className,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg ">{label}</label>
      <select
        name={name}
        id="species"
        value={value}
        onChange={onChange}
        className={
          'border-slate-800 border-1 py-1.5  px-2 rounded-md focus:outline-none' +
          className
        }
      >
        {children}
      </select>
    </div>
  )
}
