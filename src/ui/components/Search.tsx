import type { ChangeEvent } from "react";

interface Props {
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({ value, placeholder, onChange }: Props) {
  return (
    <input
      name="search"
      value={value}
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
      className="px-4  border-1 border-slate-300 rounded-lg focus:outline-none"
    />
  );
}
