import React from 'react'
import { BiFontSize } from 'react-icons/bi';
import Typewriter from 'typewriter-effect';
const Welcome = () => {
 
  return (
    <>
    <div className=' container text-center mt-5 pt-5 ms-auto me-auto ' >
      <div className='d-flex  align-items-center justify-content-center' style={{height:'70vh', fontSize: 30}}><strong className=''>
   <Typewriter
  onInit={(typewriter) => {
    typewriter.typeString('Welcome To Admin...')
      .callFunction(() => {
        console.log('String typed out!');
      })
      .pauseFor(2500)
      // .deleteAll()
      .callFunction(() => {
        console.log('All strings were deleted');
      })
      .start();
  }}
/>
</strong>
</div>
</div>
    </>
  )
}

export default Welcome