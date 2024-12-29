import React from 'react'
import { TbError404 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col text-center text-richblack-5 mt-32 justify-center items-center text-3xl text-red'>
      <div className='flex flex-col justify-center items-center'>
        <span className=''>
          <TbError404 className='text-8xl' />
        </span>
        Error - 404 <br/>Page Not Found
      </div>
      <button className='bg-yellow-100 mt-8  text-2xl text-black rounded-md px-8 py-2' onClick={()=> navigate(-1)}>Back</button>
    </div>
  )
}

export default Error
