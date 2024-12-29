import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import Highlight from './Highlight';
import { Link } from 'react-router-dom';
import Button from './Button';
import { FaArrowAltCircleRight } from 'react-icons/fa';
// import Frame from '../../../assets/Images/bghome.svg'


const Explore = () => {
    const arr = [
        'Free',
        'New to coding',
        'Most popular',
        'Skills paths',
        'Career paths',
    ]
    const [currentTab , setTab] = useState(arr[0]);
    const [courses , setCourse] = useState(HomePageExplore[0].courses);
    const [currentCard, setCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value)=>{
        setTab(value);
        const result = HomePageExplore.filter((course)=>course.tag === value);
        setCourse(result[0].courses);
        setCard(result[0].courses[0].heading)
    }

  return ( 
    <div className=' h-[450px] flex flex-col relative' >

        <div className='text-5xl font-semibold text-center'>
            Unlock the 
            <Highlight text={"Power Of Code"} />
        </div>

        <p className='text-center text-richblack-300 text-2xl text-[16px] my-10'>
            Learn to build anything you can imagine
        </p>

        <div className='flex rounded-full bg-richblack-800 mb-5 border-richblack-100 p-2 self-center'>
            {
                arr.map((item, index)=>{
                    return(
                        <div key={index} className={`${currentTab === item ?
                         "text-richblack-5 font-medium bg-richblack-900" :
                         "text-richblack-200 "} 
                         rounded-full cursor-pointer hover-bg-richblack-900 hover-text-richblack-5 px-7 py-2 `}  
                         onClick={()=> setMyCard(item)}>  {item}
                        </div>
                    )
                })
            }
        </div>
        
        <div className='translate-y-[10%] flex flex-col' >
            <div className=' flex gap-10'>
                {
                    courses.map((course, index)=>{
                        return(
                            <div key={index}  onClick={() => setCard(course.heading)}
                                className={` ${currentCard === course.heading ? "bg-white text-richblack-500" : "bg-richblack-800"} 
                                h-[300px] px-8 w-[341px] text-richblack-400 py-7 gap-5 flex flex-col`} 
                                style={currentCard === course.heading ? { boxShadow: '15px 15px yellow ' } : {}}>
                                <p className={` ${currentCard === course.heading ? "text-richblack-800" : "text-richblack-25"} text-2xl font-bold `}>
                                    {course.heading}
                                </p>
                                <p className='text-base'>{course.description}</p>
                                <hr className="border-dotted border-gray-500" style={{ borderStyle: 'dotted', borderWidth: '2px' }} />
                                <div className={`${currentCard === course.heading ? "bg-white text-blue-500" : "bg-richblack-800"} flex justify-between text-xl mt-3 `}>
                                    <p>{course.level}</p>
                                    <p>{course.lessionNumber} Lessons </p>
                                </div>
                            </div>

                        )
                    })
                }
            </div>

            <div className='relative flex items-center mt-12 gap-4 justify-center'>

                <Link to={'/login'}>
                    <div className='rounded-xl bg-yellow-50 font-bold my-4 px-2 ' >
                        <div className='flex p-2 items-center gap-3 text-xl text-black  ' >
                            <p>Become a Instructor</p>
                            <FaArrowAltCircleRight />
                        </div>
                    </div>
                </Link>

                <Button linkto={"/signup"} active={false} add={'text-xl p-2'} >
                    Learn More
                </Button>
            </div>
        </div>



    </div>
  )
}

export default Explore