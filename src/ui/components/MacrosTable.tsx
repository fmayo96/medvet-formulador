import type { Total } from './CreateRecipe'
import type { Requirements } from '../lib'
import { MACROS } from '../data/macros'

interface Props {
  total: Total
  REQUIREMENTS: Requirements
  selectedPet: PetDTO
}

const MacrosTable = ({ total, REQUIREMENTS, selectedPet }: Props) => {
  return (
    <table className="w-full table-auto my-4 mx-4 h-full">
      <thead className="text-end">
        <tr>
          <th className="text-start">Macros</th>
          <th>Objetivo</th>
          <th>Total</th>
          <th>% Objetivo</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-end">
          <td className="text-start">Energía kcal</td>
          <td>{selectedPet.recommendedCaloricIntake} </td>
          <td>{total['Energía'].toFixed(2)}</td>
          <td>
            {Math.round(
              (total['Energía'] / selectedPet.recommendedCaloricIntake) * 100
            )}
            %
          </td>
        </tr>
        {MACROS.filter((m) => m.nombre !== 'Energía').map((m, idx) => (
          <tr key={idx} className="text-end h-4">
            <td className={`text-start ${m.bold && 'font-bold'}`}>
              {m.mostrar ? m.mostrar : m.nombre} {m.unidad && m.unidad}
            </td>
            <td>
              {REQUIREMENTS[m.nombre] !== undefined
                ? REQUIREMENTS[m.nombre].toFixed(2)
                : ' '}
            </td>
            <td>{m.nombre === ' ' ? ' ' : total[m.nombre].toFixed(2)}</td>
            <td
              className={
                total[m.nombre] / REQUIREMENTS[m.nombre] >= 1
                  ? 'text-green-600'
                  : ''
              }
            >
              {REQUIREMENTS[m.nombre]
                ? `${Math.round(
                    (total[m.nombre] / REQUIREMENTS[m.nombre]) * 100
                  )}%`
                : ' '}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MacrosTable
