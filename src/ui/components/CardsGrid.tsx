import Card from "./Card";

interface Props {
  pets: PetInfo[] | undefined;
}

const CardsGrid = ({ pets }: Props) => {
  return (
    <>
      {pets?.length === 0 ? (
        <p className="text-slate-400 font-semibold">
          No se encontraron perfiles.
        </p>
      ) : (
        <div
          className="w-full grid grid-cols-1 py-4 lg:grid-cols-2 gap-4 overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {pets?.map((p) => (
            <Card pet={p} />
          ))}
        </div>
      )}
    </>
  );
};
export default CardsGrid;
