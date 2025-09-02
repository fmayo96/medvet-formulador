import Card from './Card'

interface Props {
  pets: PetDTO[] | undefined
}

export default function CardsGrid({ pets }: Props) {
  return (
    <>
      {pets?.length === 0 ? (
        <p className="text-slate-400 font-semibold">
          No se encontraron perfiles.
        </p>
      ) : (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          {pets?.map((p) => (
            <Card pet={p} />
          ))}
        </div>
      )}
    </>
  )
}
