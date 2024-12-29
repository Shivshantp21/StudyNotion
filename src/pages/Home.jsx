import React from 'react';
import {FaArrowAltCircleRight } from 'react-icons/fa'
import {Link} from 'react-router-dom';
import Button from '../comp/core/HomePage/Button';
import Highlight from '../comp/core/HomePage/Highlight';
import Banner from '../assets/Images/banner.mp4'
import CodeBlock from '../comp/core/HomePage/CodeBlock';
import Gradient from '../comp/core/HomePage/Gradient';
import Timeline from '../comp/core/HomePage/Timeline';
import TimeSecond from '../comp/core/HomePage/TimeSecond';
import TimeThree from '../comp/core/HomePage/TimeThree';
import Explore from '../comp/core/HomePage/Explore';
import Frame from '../assets/Images/bghome.svg';
import Footer from '../comp/common/Footer';

const Home = () => {
  return (
    <div>
        <section className='text-white relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-between' >
            <Link to={'/signup'}>
                <div className='rounded-full bg-richblack-800 font-bold mx-auto mt-16 mb-3' >
                    <div className='flex p-2 items-center gap-3 text-xl ' >
                        <p>Become a Instructor</p>
                        <FaArrowAltCircleRight />
                    </div>
                </div>
            </Link>

            <div className='text-5xl font-semibold text-center m-5'>
                Empower Your Future with
                <Highlight text={'Coding Skills'} />
            </div>

            <div className='text-l text-richblack-400 w-[90%] text-center font-bold'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world,and get access 
                 to a <br/> wealth of resources,including hands-on projects, quizzes, and personalized feedback from instructors.  
            </div>

            <div className='flex gap-2 mt-4'>
                <Button active={true} linkto={'/about'} add={'text-l p-3'} >
                    Learn More
                </Button>
                <Button active={false} linkto={'/signup'} add={'text-l p-3'}  >
                    Book a Demo
                </Button>
            </div>

            <div className='relative flex flex-col my-3 '>

                <Gradient position={'right-80 top-6'} size={'h-16 w-2/5'} />
                <Gradient position={'-left-16 top-72'} size={'h-16 w-1/5'} />


                <div
                    className='mx-3 my-12'
                    style={{
                        boxShadow: '15px 15px rgba(255, 255, 255)',
                        position: 'relative',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                >

                    <video autoPlay loop muted  style={{height:'550px'}}>
                        <source src={Banner} type='video/mp4' />
                    </video>

                </div>

            </div>
                
            
            <div className='flex text-white'>
                <CodeBlock
                    position={"lg:flex-row"}
                    heading = {
                        <div className='text-3xl'>
                            Unlock your <Highlight text={"coding potential "}/> <br/>
                            with our online courses
                        </div>
                    }
                    subheading = {
                         <div className="text-sm leading-6">
                            Our courses are designed and taught by industry experts who <br/> have years of experience in coding and are passionate about <br/> sharing their knowledge with you.
                         </div>
                    }
                    btn1={
                        {
                            linkto: '/catalog/ai',
                            btnText: 'Try it Yourself',
                            active: true,
                            
                        }
                    }
                    btn2={
                        {
                            linkto: '/about',
                            btnText: 'Learn More',
                            active: false,
                        }
                    }
                    CodeBlock = {`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two\n</a><ahref="three/">Three</a>\n/nav>`}
                    codeColor={
                        "text-white"
                    }
                />
            </div>

            <div className='flex text-white  '>
                <CodeBlock
                CodeBlock = {`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two\n</a><ahref="three/">Three</a>\n/nav>`}
                codeColor={
                    "text-white"
                }

                position={"lg:flex-row-reverse"}
                heading = {
                    <div className='text-3xl '>
                        Start <Highlight text={"coding "}/> <br/>
                        <Highlight text={"in seconds"}/>
                    </div>
                }
                subheading = {
                    <div className="text-sm leading-6">
                        Go ahead, give it a try. Our hands-on learning environment means <br/> you'll be writing real code from your very first lesson.
                    </div>
                }
                btn1={
                    {
                        linkto: '/signup',
                        btnText: 'Continue Lesson ',
                        active: true,
                    }
                }
                btn2={
                    {
                        linkto: '/about',
                        btnText: 'Learn More',
                        active: false,
                    }
                }

                />
            </div>

            <div className='text-white '>
                <Explore/>
            </div>

        </section>

        <section className='bg-pure-greys-5 text-black flex flex-col w-[100%] items-center'>

            <div className="w-screen h-[250px] mb-32" id="sp">
                <img src={Frame} alt="" className=" w-full h-full object-cover" />
            </div>
            
            <div className='flex  w-full mx-22'>
                <div className='text-3xl font-bold mx-28 self-start  '>
                    Get the Skills you need for a <Highlight text={"job"} /> <br /> <Highlight text={"that is in demand."} />
                </div>

                <div className='flex flex-col ml-12'>
                    <p className='pr-12'>
                        The modern StudyNotion dictates its own terms. Today, to be a <br />
                        competitive specialist requires more than professional skills.
                    </p>

                    <div className="w-40 text-center">
                        <Button active={true} linkto={'/login'}>
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>


            <Timeline/>
            <TimeSecond/>
        </section>

        <section className='bg-richblack-900 w-full  flex flex-col items-center' >
            <TimeThree/>
        </section>

        <footer className='bg-richblack-800 w-full  flex flex-col items-center'  >
            <Footer/>
        </footer>
    </div>
  )
}

export default Home