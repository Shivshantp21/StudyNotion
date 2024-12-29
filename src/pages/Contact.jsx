import React from 'react';
import { TbMessages } from "react-icons/tb";
import { IoMdCall } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import Form  from '../comp/common/Form';
import Footer from '../comp/common/Footer';
import ReviewSlider from '../comp/common/ReviewSlider';
const Contact = () => {
    const data = [
        {
            name :"Chat on us",
            para : "Our friendly team is here to help",
            add : "xyzcompany@email.com",
            icon: <TbMessages />

        },
        {
            name :"Visit us",
            para : "Come and say hello at our office HQ",
            add : "Here is the location/address",
            icon: <BiWorld />


        },
        {
            name :"Call us",
            para : "Mon - Fri From 8am to 5pm",
            add : "+1234567890",
            icon:<IoMdCall />

        }
    ]
  return (
    <div>
        <section className='text-richblack-300 flex justify-center items-center'>
            <div className='flex flex-col w-[450px] items-start bg-richblack-800 p-10 rounded-md'>
                {
                    data.map((item, index)=>(
                        <div key={index} className='flex gap-2'> 
                            <div className='text-3xl text-richblack-5'>
                                {item.icon}
                            </div>
                            <div className='flex flex-col mb-10'>
                                <h1 className='text-2xl  text-richblack-5'> {item.name} </h1>
                                <p>{item.para} </p>
                                <p> {item.add} </p>
                            </div>
                        </div>
                    ))
                }
                
            </div>
            <div className=' flex justify-center items-start gap-5 ml-28 flex-col pt-40'>
                <div className='flex justify-center gap-3 flex-col'>
                    <h1 className='text-richblack-5 text-3xl'>
                        Got a Idea? We've got the skills.<br/> Let's team up
                    </h1>
                    <p>
                        Tell us more about yourself and what've you got in your mind.
                    </p>
                </div>
                <Form/>
            </div>
        </section>

        <section>
            <ReviewSlider/>
        </section>
        
        <footer className='bg-richblack-800 py-5'>
            <Footer/>
        </footer>
    </div>
  )
}

export default Contact