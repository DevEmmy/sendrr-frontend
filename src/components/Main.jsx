import React, { useState } from 'react'
import { infinity } from 'ldrs'
import { HiChevronDown, HiChevronUp, HiClipboardCopy, HiPlus, HiShare } from 'react-icons/hi'
import { getData } from '../utils/saveData'

infinity.register()
const Main = () => {
    const [data, setData] = useState(getData())
    const [show, setShow] = useState(false)
  return (
    <div className='bg-black text-white flex h-[100vh] flex-col px-xPadding py-8 max-w-full'>
        <div className="flex items-center justify-between">
            <p className='text-[1em] font-bold'>Greetings, My Chief👋🏽</p>

            <div>
            <l-infinity
                size="30"
                stroke="4"
                stroke-length="0.15"
                bg-opacity="0.1"
                speed="1.3" 
                color="#A706A5" 
            />
            </div>
        </div>

        <div className='flex flex-col bg-primary3 border-primary1 border-2 rounded-lg px-3 py-5 my-6 font-bold'>
            <div className='flex items-center justify-between'>
                <p>My Devices</p>

                    <div onClick={()=> setShow(!show)}>
                        {
                            show ?
                            <HiChevronUp />
                            :
                            <HiChevronDown />
                        }
                        
                    </div>
                    
                </div>

                <div className={`${!show ? "h-0 hidden": "h-auto block"}  flex flex-col gap-5 mt-4 transition-all`}>
                    {
                        data.devices.map((d, i)=>{
                            return(
                                <p key={i}>{d}</p>
                            )
                        })
                    }
                </div>
        </div>

        <div>
            <h2>
                Shared Contents
            </h2>

            <div className='my-5 flex flex-col gap-3'>

                <div className='bg-primary3 border-primary1 p-4 rounded-lg border-2'>
                    <p className='flex gap-1 items-center text-[0.7em]'> <HiShare /> from Emmy's Phone </p>
                    
                    <div className='flex items-center justify-between gap-4'>
                        <p className='font-bold'>JWT Token: 'SINEIWIEW9'</p>

                        <HiClipboardCopy className='bg-primary5 rounded-full p-[5px]' size={30}/>
                    </div>
                </div>


                <div className='bg-primary3 border-primary1 p-4 rounded-lg border-2'>
                    <p className='flex gap-1 items-center text-[0.7em]'> <HiShare /> from Emmy's Phone </p>
                    
                    <div className='flex items-center justify-between gap-4'>
                        <p className='font-bold'>JWT Token: 'SINEIWIEW9'</p>

                        <HiClipboardCopy className='bg-primary5 rounded-full p-[5px]' size={30}/>
                    </div>
                </div>

                <div className='bg-primary3 border-primary1 p-4 rounded-lg border-2'>
                    <p className='flex gap-1 items-center text-[0.7em]'> <HiShare /> from Emmy's Phone </p>
                    
                    <div className='flex items-center justify-between gap-4 w-full'>
                        <p className='font-bold max-w-[80%] line-clamp-2'>https://www.figma.com/file/ouW25y7Kq7j19t0tiWnXco/Afrimages?type=design&node-id=933-375&mode=design&t=qJnEVEU0HdjAVMsC-0</p>

                        <HiClipboardCopy className='bg-primary5 rounded-full p-[5px]' size={30}/>
                    </div>
                </div>

                <div className='bg-primary3 border-primary1 p-4 rounded-lg border-2'>
                    <p className='flex gap-1 items-center text-[0.7em]'> <HiShare /> from Emmy's Phone </p>
                    
                    <div className='flex items-center justify-between gap-4 w-full'>
                        <p className='font-bold max-w-[80%] line-clamp-2'>In socket.io, the socket object is a Javascript object which socket.io uses to keep track of the state of a given socket.</p>

                        <HiClipboardCopy className='bg-primary5 rounded-full p-[5px]' size={30}/>
                    </div>
                </div>

            </div>
        </div>

        <div className='bg-primary2 w-fit rounded-full p-4 fixed bottom-10 right-10 z-20 shadow-2xl'>
            <HiPlus size={30}/>
        </div>
    </div>
  )
}

export default Main