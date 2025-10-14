import deleteIcon from '../assets/delete.png'
import { useState } from 'react'
import type { ChangeEvent } from 'react'

interface props {
  name: string
  amount: number
  unit: string
  onDelete: (name: string) => void
  onChange: (name: string, amount: number) => void
}

const Ingredient = ({ name, amount, unit, onDelete, onChange }: props) => {
  const [newAmount, setNewAmount] = useState(amount)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value)
    if (!Number.isNaN(value)) {
      setNewAmount(value)
      onChange(name, value)
    }
  }

  return (
    <div className="flex gap-6 mt-2 text-start w-90 justify-between text-lg shadow rounded-md p-2">
      <div className="flex gap-2 items-start">
        <p className="flex flex-wrap">{name}:</p>
        <input
          name="amount"
          value={newAmount}
          className="outline-none w-8 text-end"
          onChange={handleChange}
        />
        <p className="w-fit">{unit}</p>
      </div>
      <img
        src={deleteIcon}
        alt="delete icon"
        className="w-f7 h-7 hover:bg-slate-100 p-1 rounded-md hover:cursor-pointer"
        onClick={() => onDelete(name)}
      />
    </div>
  )
}

export default Ingredient
