import React from 'react'
import Highlight from './Highlight'
import Compare_with_others from '../../../assets/Images/Compare_with_others.png'
import Know_your_progress from '../../../assets/Images/Know_your_progress.png'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import Button from './Button';

const TimeSecond = () => {
  return (
    <div className='mt-24 flex-col items-center '>
       <div className='flex flex-col items-center '>
            <p className='text-5xl font-bold text-center'>Your swiss knife for <Highlight text={'learning any language'}/></p>
            
            <p className='mt-3 text-xl  text-center'>
                Using spin making learning multiple languages easy with 20+ languages realistic voice-over,<br />
                progress tracking, custom schedule and more.
            </p>
        </div>

        <div className='flex'>
            <img 
                src = {Know_your_progress}
                alt = "KNowYourProgressImage"
                className='object-contain -mr-44 '
            />
            <img 
                src = {Compare_with_others}
                alt = "KNowYourProgressImage"
                className='object-contain'
            />
            <img 
                src = {Plan_your_lessons}
                alt = "KNowYourProgressImage"
                className='object-contain -ml-48'
            />
        </div>
    
        <div className='flex gap-2 mt-4 items-center justify-center'>
            <Button active={true} linkto={'signup'} add={' h-12 w-[150px] text-center h-[40px] pb-10 text-2xl font-bold'}>
                Learn More
            </Button>
        </div>

    
    </div>
  )
}

export default TimeSecond;