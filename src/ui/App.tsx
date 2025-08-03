import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [msg, setMsg] = useState("")

  useEffect(() => {
    async function getMsg() {
    const newMsg = await window.electron.hi()
    setMsg(newMsg)
  }
  getMsg()
},[])

  return (
    <>
    <h1>Medvet Formulador</h1>
    <p>{msg}</p>
    </>
  )
}

export default App
  