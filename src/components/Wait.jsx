import React from 'react'
import { lineWobble } from 'ldrs'

lineWobble.register()

// Default values shown


const Wait = () => {
  return (
    <div className='bg-black text-white flex h-[100vh] flex-col items-center justify-center px-xPadding'>
        <p className='font-semibold text-[1.5em]'>Waiting for connection</p>
        <p className='text-[0.8em] text-center mb-8'>Ensure you're on the same network with your PC</p>
            <l-line-wobble
                size="100"
                stroke="5"
                bg-opacity="0.1"
                speed="1.75" 
                color="#A706A5" 
            />

    </div>
  )
}

export default Wait