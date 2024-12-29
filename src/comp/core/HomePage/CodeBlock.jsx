import React from 'react'
import Button from "../HomePage/Button"
import {FaArrowRight} from "react-icons/fa"
import {TypeAnimation} from 'react-type-animation'

const CodeBlock = ({heading,subheading,btn1,btn2,CodeBlock,codeColor,position}) => {
  return (
    <div className={`flex ${position} my-20 justify-around gap-20 `}>

        <section className='w-[50%] flex flex-col gap-5'>

            {heading}

            <div className='text-richblack-300 font-bold '>
                {subheading}
            </div>
            <div className='flex gap-4 mt-5' >
                <Button active={btn1.active} linkto={btn1.linkto}>
                    <div className='flex gap-2 items-center' >
                        {btn1.btnText}
                        <FaArrowRight/>
                    </div>
                </Button>
                <Button active={btn2.active} linkto={btn2.linkto} >
                    {btn2.btnText}
                </Button>
            </div>
        </section>

        <section className='h-fit flex flex-row text-[15px] w-[50%] py-2 lg:w-[500px]'  >
            <div className=' text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold' >
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
           <TypeAnimation
            sequence={[CodeBlock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
           
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
            omitDeletionAnimation={true}
           />
            </div>
        </section>

    </div>
  )
}

export default CodeBlock