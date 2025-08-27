import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Contacts from './Contacts';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Contacts />
    </>
  )
}

export default App
