import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SplashScreen from './components/SplashScreen'
import CollectUsername from './components/CollectUsername'
import { io } from "socket.io-client";
import { getData } from './utils/saveData'
import Main from './components/Main'
import Connect from './components/Connect'

export let socket = io("http://192.168.140.168:3030");
export let socketId;

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  socketId = socket.id
});


function App() {
  const [showNext, setShowNext] = useState(false)
  const [component, setComponent] = useState(null)

  useEffect(()=>{
    // localStorage.clear()
    let data = getData()

    if(data?.code){
      setComponent(<Main />)
    }
    else if(data?.username){
      setComponent(<Connect setComponent={setComponent}/>)
    }
  }, [])
  

  return (
    <>
    {
      !component ? 
      <SplashScreen setShowNext={setShowNext} setComponent={setComponent}/>
      :
      component
    }
      
    </>
  )
}

export default App
