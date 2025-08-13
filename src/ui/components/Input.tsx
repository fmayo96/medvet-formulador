type InputProps = {
  type: 'text' | 'number' | 'checkbox' | 'select'
  name: string
  children?: React.ReactNode
  value: any
  label: string
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

export default function Input({
  type,
  name,
  children,
  value,
  label,
  onChange,
}: InputProps) {
  let content = (
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
      className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
    />
  )

  switch (type) {
    case 'number':
      content = (
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className="border-slate-800 border-1 py-1 px-2 rounded-md focus:outline-none"
        />
      )
      break
    case 'checkbox':
      content = (
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={value}
          onChange={onChange}
          className="w-5 h-5 accent-purple-500"
        />
      )
      break
    case 'select':
      content = (
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="border-slate-800 border-1 py-1.5  px-2 rounded-md focus:outline-none"
        >
          {children}
        </select>
      )
      break
    default:
      break
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg">{label}</label>
      {content}
    </div>
  )
}
