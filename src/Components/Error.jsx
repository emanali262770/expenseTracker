import React from 'react'
import not from '../Images/notfound.jpg'
const Error = () => {
  return (
    <div className='h-[70vh] flex justify-center items-center'>
        <img src={not} className='w-[400px]' alt="" />
    </div>
  )
}

export default Error