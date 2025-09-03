import type { ChangeEvent } from "react";
import searchLogo from "../assets/search.png";

interface Props {
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({ value, placeholder, onChange }: Props) {
  return (
    <div className="flex align-middle border-1 border-slate-300 rounded-lg px-4">
      <img src={searchLogo} alt="search icon" className="w-6 h-6 mt-2" />
      <input
        name="search"
        value={value}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        className="px-2 focus:outline-none"
      />
    </div>
  );
}
