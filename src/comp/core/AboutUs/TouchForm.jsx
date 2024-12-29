import React from 'react'
import  Form  from '../../common/Form';

const TouchForm = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-14'>
        <div className='flex justify-center items-center flex-col gap-4'>
            <h1 className='text-3xl font-bold'>Get in Touch </h1>
            <p className='text-xl text-richblack-300'>We'd love to hear from you. Please fill this form.</p>
        </div>
        <Form/>
    </div>
  )
}

export default TouchForm