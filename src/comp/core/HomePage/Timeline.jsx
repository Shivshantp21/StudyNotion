import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"
import Gradient from './Gradient'

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
];

let sz = timeline.length;
const TimelineSection = () =>{
    return (
        <section className='flex flex-col w-11/12 my-20'>
            <div className='flex'>
                <div className='mx-5'>
                    {
                        timeline.map((item , index)=>{
                            return(
                                <div key={index} className='flex flex-col '>
                                    <div  className='flex mb-5 '>
                                        <div className='flex items-center flex-col'>
                                            <div className='flex items-center justify-center rounded-full w-[75px] h-[75px] bg-white '>
                                                <img src={item.Logo} className='h-[40px] w-[40px]' alt=''/>
                                            </div>
                                                {/* {console.log(timeline)} */}
                                                {index !== sz-1 ?<div className="border-l-2 border-richblack-100 border-dotted h-12 mt-4 " />: null}
                                                {/* { console.log(index) } */}
                                        </div>
                                        <div className='ml-4' >
                                            <p className='font-bold text-xl'> {item.heading} </p>
                                            <p> {item.Description} </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='ml-52'>
                    <div className="relative">
                        <Gradient 
                            position={'absolute mr-24 bottom-20 left-0'} 
                            size={'h-3/6 w-[720px]'} 
                            value={'z-0'} 
                        />
                        <div
                            className='relative -z-1'
                            style={{
                            boxShadow: '15px 15px white',
                            position: 'relative',
                            top: 0,
                            left: 0,
                            zIndex: 1,
                            }}
                        >
                            <img src={timelineImage} className='relative h-[550px] w-[650px]' alt='' />
                        </div>

                        {/* Second Div positioned at the bottom and over the first div */}
                        <div className='bg-caribbeangreen-700 h-[100px] w-[500px] z-10 absolute -bottom-[45px] right-[100px] flex text-white'>
                            <div className="p-12 w-[50%] flex items-center gap-4">
                                <p className='text-5xl font-bold' >10</p>
                                <p className='text-caribbeangreen-300 text-base' >YEARS EXPERIENCE</p>
                            </div>
                            <div className="border-l border-gray-300 h-20 mt-3 text-caribbeangreen-500"></div>
                            <div className="p-12 w-[50%] flex items-center gap-4">
                                <p className='text-5xl font-bold' >250</p>
                                <p className='text-caribbeangreen-300 text-base'>TYPES OF COURSES</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default TimelineSection