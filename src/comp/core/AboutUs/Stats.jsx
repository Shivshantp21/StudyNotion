import React from 'react'

const StatData = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const Stats = () => {
  return (
    <div className='bg-richblack-800 h-[150px] my-10 flex justify-center'> 

        <div className='flex text-richblack-5 gap-20 justify-center'> 
            {
                StatData.map((item, index)=>(
                    <div key={index} className='flex flex-col justify-center items-center gap-4'>
                        <div className='text-3xl'>
                            {item.count}      
                        </div>
                        <div className='text-xl text-richblack-300'>
                            {item.label}
                        </div>
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default Stats