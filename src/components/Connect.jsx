import React, { useEffect, useState } from 'react'
import { generateRandomString } from '../utils/generateConnectionCode,js';
import { HiArrowRight } from 'react-icons/hi';
import { socket } from '../App';
import Main from './Main';
import { getData, saveData } from '../utils/saveData';

const Connect = ({setComponent}) => {

    const [select, setSelect] = useState(false);
    const [component, setCom] = useState()

    
  return (
    <div className='bg-black text-white flex h-[100vh] gap-6 flex-col items-center justify-center px-xPadding'>
        {
            !component ?
            <>
                <div className='p-4 bg-white w-full rounded-lg text-black text-center font-bold' onClick={()=> setCom(<Create setComponent={setComponent}/>)}>
                    Create Connection
                </div>

                <div className='p-4 bg-white w-full rounded-lg text-black text-center font-bold' onClick={()=> setCom(<Join setComponent={setComponent}/>)}>
                    Join a Connection
                </div>
            </>
            :
            component
        }
    </div>
  )
}

const Create = ({setComponent})=>{
    let [code, setCode] = useState(generateRandomString())
    const [devices, setDevices] = useState([])

    socket.on("joined", (data)=> {
        let myDevices = [...devices, data]
        setDevices(myDevices)

        let myData = getData()
        myData.devices = myDevices;
        saveData(myData)
    })

    socket.on("established", (data)=> {
        let toSave = {
            username: data.username,
            code: data.code,
            codeCreator: data.codeCreator
        }
        saveData(toSave);
    })

    useEffect(()=>{
        socket.emit("createConnection", code)

    }, [])

    return(
        <div className='w-full flex flex-col gap-5 '>
            <p className='font-bold text-center'>Connection Code</p>
            <p className='text-center border-2 border-gray-200 w-[100%] p-3 rounded-lg text-[1.5em] font-bold'>{code}</p>

            <div>
                <p className='text-green-500 font-bold'>Connected devices:</p>

                {
                    devices?.map((d, i)=>{
                        return (
                            <p className='text-[0.8em]' key={i}>{d}</p>
                        )
                    })
                }
            </div>

            <button className=' bg-white text-black py-4 mt-6  rounded-lg font-bold flex w-full items-center justify-center gap-2'
            onClick={()=> {
                // handleSubmit()    
                setComponent(<Main />)
            }}
        >
            Continue <HiArrowRight />
            </button>
        </div>
    )
}

const Join = ({setComponent})=>{

    const [code, setCode] = useState()

    const handleCode= (e)=>{
        setCode(e.target.value)
    }

    const handleSubmit = ()=>{
        socket.emit("join", code)
    }
    return(
        <div className='w-full flex flex-col gap-1 '>
            <p>Enter Connection Code</p>
            <input type="text" placeholder="Connection Code" className='p-4 rounded-md my-2 w-full bg-transparent border-gray-500 text-[0.8em] border-[1px] text-white' value={code} onChange={handleCode}/>
            <button className=' bg-white text-black py-4 mt-6  rounded-lg font-bold flex w-full items-center justify-center gap-2'
            onClick={()=> {
                handleSubmit()    
                // setComponent(<Connect setComponent={setComponent}/>)
            }}
        >
            Join
            </button>
        </div>
    )
}

export default Connect