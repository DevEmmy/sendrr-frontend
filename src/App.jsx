import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SplashScreen from './components/SplashScreen'
import CollectUsername from './components/CollectUsername'

function App() {
  const [showNext, setShowNext] = useState(false)
  const [component, setComponent] = useState(null)

  return (
    <>
    {
      !showNext ? 
      <SplashScreen setShowNext={setShowNext} setComponent={setComponent}/>
      :
      component
    }
      
    </>
  )
}

export default App
