import React, { useEffect, useState } from 'react'
import { infinity } from 'ldrs'
import { HiChevronDown, HiChevronUp, HiClipboardCopy, HiPaperAirplane, HiPlus, HiShare, HiX } from 'react-icons/hi'
import { getData, saveData } from '../utils/saveData'
import { toastSuccess } from '../utils/toaster'
import { socket } from '../App'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

infinity.register()
const Main = () => {
    const [data, setData] = useState(getData())
    const [show, setShow] = useState(false)

    const [showDialogue, setShowDialogue] = useState(false)
    const [message, setMessage] = useState()
    const [receiver, setReceiver] = useState(data.devices[0])

    const [messages, setMessages] = useState([])
    

    useEffect(()=>{
        socket.on("receive", (data)=>{
            // toastSuccess("New Message")
            let news = messages;
            news.push(data.content)
            
            console.log(news)
            setMessages([data.content, ...messages])
          })

    }, [socket])



    const handleMessage = (e)=>{
        setMessage(e.target.value)
    }

    const handleSubmit = ()=>{
        let payload = {
            content: message,
            receiverUsername: receiver,
            senderUsername: data.username
        }

        console.log(payload)
        socket.emit("send", payload);
    }

  return (
    <div className='bg-black text-white flex h-full min-h-[100vh] flex-col px-xPadding py-8 max-w-full'>
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

        <div className='py-3 text-[0.8em] flex flex-col gap-3'>
            <p>My Device: <span className='bg-primary1 py-0 font-bold px-3 rounded-3xl'>{data.username}</span></p>

            <p>
                Connection Code: <span className='bg-primary1 py-0 font-bold px-3 rounded-3xl'>{data.code}</span> 
            </p>

            <div className='flex flex-col bg-primary3 border-primary1 border-2 rounded-lg px-3 py-5 font-bold'>
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
                        data.devices?.map((d, i)=>{
                            return(
                                <p key={i}>{d}</p>
                            )
                        })
                    }
                </div>
        </div>
        </div>

        

        <div>
            <h2>
                Shared Contents
            </h2>

            <div className='my-5 flex flex-col gap-3'>

                {
                    messages.map((m, i)=>{
                        return(
                             <div className='bg-primary3 border-primary1 p-4 rounded-lg border-2'>
                                <p className='flex gap-1 items-center text-[0.7em]'> <HiShare /> from {m.senderUsername} </p>
                                
                                <div className='flex items-center justify-between gap-4 w-full'>
                                    <p className='font-bold max-w-[80%] line-clamp-2'>{m.content}</p>

                                    <HiClipboardCopy className='bg-primary5 rounded-full p-[5px]' size={30}/>
                                </div>
                            </div>
                        )
                    })
                }

               

            </div>
        </div>

        <div className='bg-primary2 w-fit rounded-full p-4 fixed bottom-10 right-10 z-20 shadow-2xl' onClick={()=> setShowDialogue(true)}>
            <HiPlus size={30}/>
        </div>

        {
            showDialogue &&
            <div className='fixed top-0 h-[100vh] left-0 right-0 bg-black z-30 py-10 px-xPadding'>
            <div className="flex justify-end">
                <HiX size={24} onClick={()=> setShowDialogue(false)}/>
            </div>

            <div className='mt-[15vh]'>
                <p>Select Device:</p>
                <select name="" id="" defaultValue={data.devices[0]} onChange={(e)=> {setReceiver(e.target.value); console.log(e.target.value)}} className='bg-white text-black p-3 w-1/2 rounded-lg mb-3'>
                    {
                        data.devices?.map((d)=>{
                            return(
                                <option value={d}>{d}</option>
                            )
                        })
                    }
                </select>
                <textarea name="" id="" value={message} onChange={handleMessage} className='w-full h-[30vh] bg-transparent border-2 border-white rounded-xl focus:outline-none resize-none p-5' placeholder='Enter text to send here...' />
            </div>
            <button className=' bg-white text-black py-4 mt-6  rounded-lg font-bold flex w-full items-center justify-center gap-2'
            onClick={()=> {
                handleSubmit()    
                // setComponent(<Connect setComponent={setComponent}/>)
            }}
        >
            Send
            </button>
        </div>
        }
        
    </div>
  )
}

export default Main