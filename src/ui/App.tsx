import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [msg, setMsg] = useState<string|null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  async function handleClick() {
    if (nameRef.current === null) return
    const newMsg = await window.electron.hi(nameRef.current.value)
    setMsg(newMsg)
  }

  return (
    <>
    <h1>Medvet Formulador</h1>
    {msg && <h2>{msg}</h2>}
    <input type="text" ref={nameRef} />
    <button onClick={handleClick}>Submit</button>
    </>
  )
}

export default App
  