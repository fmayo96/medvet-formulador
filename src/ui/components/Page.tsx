import { type ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="w-3/4 h-screen py-8 px-12 flex flex-col items-center">
      {children}
    </div>
  );
}
