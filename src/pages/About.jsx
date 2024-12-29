import React from 'react';
import Highlight from '../comp/core/HomePage/Highlight';
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Stats from '../comp/core/AboutUs/Stats';
import LearningGrid from '../comp/core/AboutUs/LearningGrid';
import TouchForm from '../comp/core/AboutUs/TouchForm';
import Footer from "../comp/common/Footer"
import ReviewSlider from '../comp/common/ReviewSlider';
const About = () => {
    const gradientOrange= {
        background: 'linear-gradient(90deg, #F09819, #FF512F)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };
    const gradientYellow= {
        background: 'linear-gradient(90deg, #E65C00, #F9D423)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };
    const gradientRed= {
        background: 'linear-gradient(90deg, #833AB4, #FD1D1D,#FCB045)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };
  return (
    <div className="mx-auto w-screen text-white ">
        <section className=''>
            <div className='bg-richblack-800 h-[400px] w-screen relative flex flex-col items-center pt-10 '>
                <h1 className="text-richblack-5 text-4xl font-bold text-center" >Driving Innovation in Online Education for a <br/> <Highlight text={"Brighter Future"} /></h1>
                <p className='text-richblack-300 text-lg px-24 text-center my-5' >Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a <br/>  brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a <br/> vibrant learning community.</p>
            </div>
            <div className='flex absolute gap-x-7 translate-x-60 -translate-y-40 mt-4 '>
                <img src={BannerImage1} alt='' height={'200px'} width={'300px'} />
                <img src={BannerImage2} alt='' height={'200px'} width={'300px'} />
                <img src={BannerImage3} alt='' height={'200px'} width={'300px'} />
            </div>
            <div className='relative  mt-40 flex justify-center items-center'>
                <h1 className='text-center text-2xl text-bold' >
                    <Highlight color='text-richblack-600' text={'"'}/> We are passionate about revolutionizing the way we learn. Our <br/> innovative platform <Highlight text={"combines technology"} /> , <Highlight style={gradientOrange} text={'expertise'} /> , and community to <br/> create an  <Highlight style={gradientYellow} text={'unparalleled educational experience'} />. <Highlight color='text-richblack-600' text={'"'}/>
                </h1>
            </div>
        </section>


        <section className='my-28 text-richblack-300'>
            <div>
                <div className='flex justify-center items-center gap-3'>
                    {/* founding story left box */}
                    <div className='flex px-14 justify-center gap-3 w-[50%] flex-col'>
                        <div className='text-4xl'>
                            <Highlight style={gradientRed} text='Our Founding Story' />
                        </div>

                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                        <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    {/* foudning story right box */}
                    <div className='w-[40%] ml-10'>
                        <img  src={FoundingStory} alt='' width={'500px'}  />
                    </div>
                </div>

                {/* vision and mission wala parent div */}
                <div className='flex mt-40  text-richblack-300 justify-center items-center mx-10'>
                    {/* left box */}
                    <div className='flex px-14 justify-center gap-3 w-[50%] flex-col '>
                        <h1 className='text-4xl'> <Highlight style={gradientOrange} text={'Our Vision'}/> </h1>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>

                    {/* right box */}
                    <div className='flex px-14 justify-center gap-3 w-[50%] flex-col'>
                        <h1 className='text-4xl'>
                            <Highlight text={'Our Mission'}/>
                        </h1>
                        <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>

            </div>
        </section>

        <section>
            <Stats/>
            <LearningGrid/>
            <TouchForm/>
        </section>

        <section>
            <ReviewSlider/>
        </section>

        <footer className='bg-richblack-800 p-1'>
            <Footer/>
        </footer>
    </div>
  )
}

export default About