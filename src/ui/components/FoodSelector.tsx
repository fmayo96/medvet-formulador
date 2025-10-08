import { useState } from 'react'
import type { ChangeEvent } from 'react'
import Button from './Button'
import { parseDecimal } from '../lib'

interface props {
  foods: Food[]
  onAdd: (food: Food) => void
  onClose: () => void
}

const FoodSelector = ({ foods, onAdd, onClose }: props) => {
  const [search, setSearch] = useState('')
  const [food, setFood] = useState<Food>()
  const [amount, setAmount] = useState('0')

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const newSearch = event.target.value
    setSearch(newSearch)
  }

  function handleAmount(event: ChangeEvent<HTMLInputElement>) {
    const newAmount = event.target.value
    setAmount(newAmount)
    const parsedAmount = parseDecimal(newAmount)
    setFood((prev) => {
      if (prev)
        return {
          ...prev,
          amount: parsedAmount,
        }
    })
  }

  function handleAgregar(f: Food | undefined) {
    if (!f) {
      onClose()
    }
    if (Number.isNaN(f?.amount)) return
    onAdd(f!)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/75">
      <div className="w-160 h-100 flex flex-col gap-4 bg-white rounded-md p-8 border-3 border-slate-300">
        <input
          value={search}
          placeholder="Buscar alimento"
          className="border-1 rounded-md border-slate-300 py-1 px-2 outline-none"
          onChange={handleSearch}
        />
        <div className="w-full h-48 border-1 border-slate-300 rounded-md overflow-y-auto px-1 py-1">
          {foods
            .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
            .map((f, idx) => (
              <p
                key={idx}
                onClick={() => setFood(f)}
                className="hover:bg-slate-100 rounded-sm px-4 py-2"
              >
                {f.name}
              </p>
            ))}
        </div>
        <div className="flex gap-2">
          <p>{food?.name ? food.name : ' '}</p>
          {food && (
            <input
              type="text"
              value={amount}
              className="w-12 text-end outline-none"
              onChange={(e) => handleAmount(e)}
            />
          )}
          <p>{food?.unidad ? food.unidad : ' '}</p>
        </div>
        <div className="flex justify-evenly mt-8">
          <Button type="light" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="dark" onClick={() => handleAgregar(food)}>
            Agregar
          </Button>
        </div>
      </div>
    </div>
  )
}
export default FoodSelector
