import type { Total } from './CreateRecipe'
import { calculateDMPercentageAll, type Requirements } from '../lib'
import { MACROS } from '../data/macros'
import { STANDARDS } from '../data/standards_es'

type Nutrient = keyof Total

interface Props {
  total: Total
  REQUIREMENTS: Requirements
  selectedPet: PetDTO
}

const NO_DM = [
  'Energía',
  'Tamaño porción',
  'Agua',
  'Materia seca',
  'Materia seca ajustada',
]

const MacrosTable = ({ total, REQUIREMENTS, selectedPet }: Props) => {
  const SUL = STANDARDS['safeUpperLimit'][selectedPet.species]

  let allDMPercentages = calculateDMPercentageAll(total)

  function displayDMPercentage(nombre: string) {
    if (NO_DM.includes(nombre)) return ''
    if (Number.isNaN(allDMPercentages[nombre])) return ''
    return `${allDMPercentages[nombre].toFixed(2)}%`
  }

  function percentageColor(nutrient: Nutrient) {
    if (!(nutrient in SUL)) {
      if (total[nutrient] > REQUIREMENTS[nutrient]) return 'text-green-600'
      return ''
    }
    if (SUL[nutrient as keyof typeof SUL] === null) {
      if (total[nutrient] > REQUIREMENTS[nutrient]) return 'text-green-600'
      return ''
    }
    if (
      total[nutrient] >
      SUL[nutrient as keyof typeof SUL]! * selectedPet.metabolicWeight
    )
      return 'text-red-600'
    if (total[nutrient] > REQUIREMENTS[nutrient]) return 'text-green-600'
    return ''
  }

  console.log(SUL)

  return (
    <table className="w-full table-fixed  my-4  h-full">
      <thead className="text-end">
        <tr>
          <th className="text-start w-3/8">Macros</th>
          <th className="w-1/8">Objetivo</th>
          <th className="w-1/8">Total</th>
          <th className="w-1/8">% DM</th>
          <th className="w-2/8">% Objetivo</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-end">
          <td className="text-start">Energía kcal</td>
          <td>{selectedPet.recommendedCaloricIntake} </td>
          <td>{total['Energía'].toFixed(2)}</td>
          <td></td>
          <td
            className={
              total['Energía'] > selectedPet.recommendedCaloricIntake
                ? 'text-green-600'
                : ''
            }
          >
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
            <td>{m.nombre === ' ' ? ' ' : displayDMPercentage(m.nombre)}</td>
            <td className={percentageColor(m.nombre)}>
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
