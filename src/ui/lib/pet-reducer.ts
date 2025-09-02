import type { ChangeEvent } from 'react'

interface Action {
  type: string
  event?:
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>
    | ChangeEvent<HTMLTextAreaElement>
  path?: string
}
export function petReducer(petData: PetData, action: Action) {
  switch (action.type) {
    case 'changeInput': {
      if (action.event!.target.type === 'checkbox') {
        //@ts-expect-error
        const { name, checked } = action.event!.target
        return {
          ...petData,
          [name]: checked,
        }
      }
      const { name, value } = action.event!.target
      return { ...petData, [name]: value }
    }
    case 'changeNum': {
      const { name, value } = action.event!.target
      const numValue = Number(value)
      if (Number.isNaN(numValue)) return petData
      return {
        ...petData,
        [name]: numValue,
      }
    }
    case 'changeSelect': {
      const { name, value } = action.event!.target
      return {
        ...petData,
        [name]: value,
      }
    }
    case 'changeImage': {
      return {
        ...petData,
        imgPath: action.path!,
      }
    }
    case 'changeTextArea': {
      const { name, value } = action.event!.target
      return {
        ...petData,
        [name]: value,
      }
    }
    default:
      return petData
  }
}
