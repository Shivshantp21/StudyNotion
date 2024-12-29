import React from 'react';
import Img1 from '../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom';
import Facebook from '../../assets/footer_logo/fb.png'
import Tweet from '../../assets/footer_logo/tweet.png'
import Google from '../../assets/footer_logo/google.png'
import Utube from '../../assets/footer_logo/utube.png'
import { FooterLink2 } from '../../data/footer-links';

const Footer = () => {
  return (
    <div className='m-12 flex gap-12 flex-col'>
        <div className='flex flex-row gap-16 '>
            <div className='flex gap-16 ' >
                <div className='text-richblack-400 flex flex-col gap-5'>
                    <Link to={'/'}>
                        <img src={Img1} alt=''/>
                    </Link>
                    <a className='text-richblack-100 text-xl' href='/company' >Company</a>
                    <a className='text-base' href='/about'>About</a>
                    <a className='text-base' href='/careers'>Careers</a>
                    <a className='text-base' href='/affiliates'>Affiliates</a>
                    <div className='flex gap-5 ' >
                    <a href='https://www.facebook.com' >
                        <img src={Facebook} alt='Facebook' className='h-8 w-8 ' />
                    </a>
                    <a href='https://www.google.com' >
                        <img src={Google} alt='Google' className='h-8 w-8 '/>
                    </a>
                    <a href='https://www.twitter.com' >
                        <img src={Tweet} alt='Tweet' className='h-8 w-8 '/>
                    </a>
                    <a href='https://www.youtube.com' >
                        <img src={Utube} alt='Utube' className='h-8 w-8  '/>
                    </a>
                    </div>

                    
                </div>

                <div className='flex flex-col text-richblack-400'>
                    <div className='flex flex-col mt-4 gap-5' >
                        <a href='/resources' className='text-richblack-100 text-xl' >Resources</a>
                        <a className='text-base' href='/articles' >Articles</a>
                        <a className='text-base' href='/blog' >Blog</a>
                        <a className='text-base' href='/chart' >Chart Sheet</a>
                        <a className='text-base' href='/code' >Code Challenges</a>
                        <a className='text-base' href='/docs' >Docs</a>
                        <a className='text-base' href='/projects' >Projects</a>
                        <a className='text-base' href='/videos' >Videos</a>
                        <a className='text-base' href='/workspaces'> Workspaces</a>
                    </div>

                    <div className='flex flex-col mt-4 gap-5'>
                        <a href='/support' className='text-richblack-100 text-xl' >Support</a>
                        <a className='text-base' href='/help' >Help Center</a>
                    </div>

                </div>

                <div className='flex flex-col text-richblack-400'>
                    <div className='flex flex-col mt-4 gap-5' >
                        <a href='/resources' className='text-richblack-100 text-xl' >Plans</a>
                        <a className='text-base' href='/paid' >Paid Memberships</a>
                        <a className='text-base' href='/students' >For Students</a>
                        <a className='text-base' href='/business' >Business Solutions</a>
                    </div>

                    <div className='flex flex-col mt-4 gap-5'>
                        <a href='/community' className='text-richblack-100 text-xl' >Community</a>
                        <a className='text-base' href='/forums' >Forums</a>
                        <a className='text-base' href='/chapters' >Chapters</a>
                        <a className='text-base' href='/events' >Events</a>
                    </div>

                </div>

            </div>

            <div className='border-l-2  border-richblack-400  '></div>

            <div className='text-richblack-400 flex gap-16'>
                {
                    FooterLink2.map((item , index)=>{
                        return (
                            <div key={index}>
                                <div>
                                    <div className='flex flex-col mt-4 gap-5' >
                                        <a href='/resources' className='text-richblack-100 text-xl' >{item.title} </a>
                                        <div>
                                            {
                                                item.links.map((elem , index)=>{
                                                    return (
                                                        <div key={index} className='mt-5'>
                                                            <a className='text-base' href={elem.link}>{elem.title}</a>
                                                        </div>
                                                    )

                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
        
                    })
                }

            </div>
        </div>

        <div className='border-2  border-richblack-400  '></div>

        <div className=" flex justify-between text-xl text-richblack-400">
            <div className=" flex gap-10">
                <a href="/privacy" >Privacy Policy</a>
                <a href="/cookie" >Cookie Policy</a>
                <a href="/terms" >Terms</a>
            </div>
            <div>
                <p>Made by Shivshant Prasad @2024 StudyNotion</p>
            </div>
        </div>

    </div>
  )
}

export default Footer