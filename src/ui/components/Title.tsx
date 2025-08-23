interface TitleProps {
  content: string;
}
export default function Title({ content }: TitleProps) {
  return (
    <>
      <h1 className="text-3xl mb-8">{content}</h1>
      <hr className="border-1 border-slate-300 w-full" />
    </>
  );
}
