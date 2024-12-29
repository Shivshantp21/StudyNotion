import React from 'react';
import Instructor from "../../../assets/Images/Instructor.png"
import Highlight from './Highlight';
import {FaArrowRight } from 'react-icons/fa'
import {Link} from 'react-router-dom';
import ReviewSlider from '../../common/ReviewSlider';


const TimeThree = () => {
  return (
    <div className='mt-12' >
        <div className='flex mx-28 my-24 text-white gap-24' >
        
            <div className='h-full' style={{boxShadow: '-15px -15px white',position: 'relative',top: 0,left: 0,zIndex: 1,}}>
                <img src={Instructor} className='relative object-contain ' alt='' />
            </div>

            <div className='mt-12 flex flex-col'>
                <b className='text-5xl'>Become an <br /> <Highlight text={'instructor'} /> </b>
                <p className='text-base mt-12 text-richblack-300 leading-8 tracking-wider'>
                    Instructors from around the world teach millions of students on <br /> StudyNotion. We provide the tools and skills to teach what you <br /> love.
                </p>
                <div className='flex  items-center p-3 gap-5 bg-yellow-50 text-black w-[280px] rounded-xl font-bold text-xl mt-6'>
                    <Link to="/signup">
                        <p>Start Teaching Today</p>
                    </Link>
                    <FaArrowRight />
                </div>
            </div>

        </div>

        <div className='text-white' >
            <ReviewSlider/>
        </div>

    </div>
  )
}

export default TimeThree