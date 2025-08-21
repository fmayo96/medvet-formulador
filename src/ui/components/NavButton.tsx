type SelectedButton = 1 | 2 | 3;

type NavButtonProps = {
  name: string;
  isSelected: boolean;
  id: SelectedButton;
  onSelect: (id: SelectedButton) => void;
};

export default function NavButton({
  name,
  isSelected,
  id,
  onSelect,
}: NavButtonProps) {
  let cssClasses =
    "my-2 text-lg hover:bg-slate-200 w-7/8 rounded-md py-2 hover:cursor-pointer ";
  if (isSelected) {
    cssClasses += "bg-slate-100";
  }
  return (
    <button onClick={() => onSelect(id)} className={cssClasses}>
      {name}
    </button>
  );
}
