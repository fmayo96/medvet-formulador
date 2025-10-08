interface Props {
  recipe: RecipeDTO
  handleClose: () => void
}

const Recipe = ({ recipe, handleClose }: Props) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/75">
      <div className="w-160 h-100 flex flex-col gap-8 bg-white rounded-md p-8 border-3 border-slate-300">
        <h1 className="text-xl font-semibold">
          {recipe.petName}
          {'\t'} - {'\t'} {recipe.date}
        </h1>
        <div className="flex flex-col gap-2 overflow-y-auto">
          {recipe.ingredients.map((r) => (
            <p>
              {r.name} {r.amount} {r.unidad}
            </p>
          ))}
        </div>
        <button
          className="bg-[#75578F] hover:bg-[#75578F]/80 hover:cursor-pointer text-white rounded-md p-2 mt-12"
          onClick={handleClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default Recipe
