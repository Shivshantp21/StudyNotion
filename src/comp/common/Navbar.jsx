import { Link, matchPath, useLocation } from 'react-router-dom';
import {NavbarLinks} from '../../data/navbar-links';
import React from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import {IoIosArrowDropdownCircle} from 'react-icons/io';
import {useState, useEffect} from 'react';


const subLink = [
    {
        title: "Ai",
        link:"/catalog/ai"
    },
    {
        title: "Web-Development",
        link:"/catalog/web-development"
    },
    {
        title: "DSA",
        link:"/catalog/dsa"
    },
    {
        title: "Python",
        link:"/catalog/python"
    },
];
const Navbar = () => {


    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {totalItems} = useSelector((state)=>state.cart);
    // const [subLinks , setSubLinks] = useState([]);
    

    // const fetchSublinks = async() =>{
    //     try{
    //         const result = await apiConnector("GET", categories.CATEGORIES_API);
    //         console.log("Printing Sublinks " , result);
    //         setSubLinks(result.data.data);
    //     }catch(error){
    //         console.log("Error fetching sublinks " , error);
    //     }

    // }
    // useEffect(() => {
    //   fetchSublinks();
    // }, [])
    
   
    const location = useLocation();
    const matchRoute = (route)=>{
        return matchPath({path:route} , location.pathname)
    }

  return (
    <div className="flex h-14 border-b-[1px] justify-center border-b-richblack-700">
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
            <Link to='/'>
                <img src={logo} width={160} height={42} loading={'lazy'} alt='' />
            </Link>

            <nav className="flex  text-richblack-400 ml-68">
                <ul className="flex gap-10  ">
                    {
                        NavbarLinks.map((item , index)=>{
                            return(
                                <li key={index}>
                                {
                                        item.title === "Catalog"?(
                                            <div className='relative flex items-center gap-2 group'>
                                              <p> {item.title} </p>
                                              <IoIosArrowDropdownCircle/>
                                              <div className='invisible absolute left-[50%]
                                                    translate-x-[-50%] translate-y-[50%]
                                                    top-0 z-10
                                                    flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                                    opacity-0 transition-all duration-200 group-hover:visible
                                                    group-hover:opacity-100 lg:w-[300px]'>

                                                    <div className='absolute left-[50%] top-0
                                                    translate-x-[80%]
                                                    translate-y-[-35%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                                    </div>

                                                    {
                                                        subLinks.length ? (
                                                                subLinks.map( (subLink, index) => (
                                                                    <Link to={`${subLink.link}`} key={index}>
                                                                        <p className='p-1'>{subLink.title}</p>
                                                                    </Link>
                                                                ) )
                                                        ) : (<div></div>)
                                                    }
                                                </div>
                                                
                                            </div>
                                        ):
                                        (
                                            <Link to={item?.path}>
                                                <p className={`${matchRoute(item?.path)?"text-yellow-25":"text-richblack-400"}`}>{item.title}</p>
                                            </Link>
                                        )
                                    }
                                </li>
                        
                            )
                        })
                    }
                </ul>
            </nav>

            <div className='flex gap-10'>
                {
                    user && user.accountType !== "Instructor" &&
                    (
                        <Link to ='/dashboard/cart'>
                            <AiOutlineShoppingCart className='text-white text-3xl relative' />
                            {
                                totalItems > 0 && (
                                    <span className='text-white absolute top-1 ml-7 bg-red rounded-full w-5 text-center '>
                                        {totalItems} 
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Login
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                SignUp
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown/>
                }
                
            </div>


        </div>
    </div>
  )
}

export default Navbar
