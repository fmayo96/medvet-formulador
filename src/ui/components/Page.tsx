import { type ReactNode } from 'react'

interface PageProps {
  children: ReactNode
}

const Page = ({ children }: PageProps) => {
  return (
    <div className="w-3/4 h-screen py-8 px-6 flex flex-col items-center">
      {children}
    </div>
  )
}
export default Page
