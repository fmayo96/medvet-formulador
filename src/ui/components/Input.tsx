type InputProps = {
  type: 'text' | 'number' | 'checkbox'
  name: string
  value: string | number | boolean
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, name, value, label, onChange }: InputProps) => {
  let content = (
    <input
      type="text"
      name={name}
      id={name}
      value={value as string}
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
          value={value as number}
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
          checked={value as boolean}
          onChange={onChange}
          className="w-5 h-5 accent-sky-700"
        />
      )
      break
    default:
      break
  }

  let cssClasses = 'flex flex-col gap-1'
  if (type === 'checkbox') {
    cssClasses += ' items-center mb-4'
  }
  return (
    <div className={cssClasses}>
      <label className="text-lg">{label}</label>
      {content}
    </div>
  )
}
export default Input
