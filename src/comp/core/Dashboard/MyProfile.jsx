import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

const MyProfile = () => {
  const {user} = useSelector((state) => state.profile);
  console.log( " Here is the user ",user);
  const navigate = useNavigate();
  return (
    <div className='text-white w-11/12 flex flex-col items-center gap-3 my-10'>
      <div className='flex -ml-[720px] '>
        <h1 className='text-2xl'>My Profile</h1>
      </div>
      <div className='text-white w-11/12 flex mt-3 justify-center items-center ' >
        <div className='bg-richblack-800 py-5 w-[80%] flex justify-between px-4 rounded-md border-[1px] border-richblack-700'>
            <div className='flex gap-3 justify-center items-center '>
              <img src={user?.image} alt='userImg' className='ml-5 rounded-full h-20 w-20 object-cover'/>
              <div className='flex flex-col justify-center'>
                <div className='flex gap-x-1 text-xl'>
                  <p> {user?.firstName} </p>
                  <p> {user?.lastName} </p>
                </div>
                <p className='text-richblack-500'> {user?.email} </p>
              </div>
            </div>
            <div className='flex gap-3 justify-center items-start '>
              <IconBtn icon={<FaEdit />} active={true} text={"Edit"} onclick={()=>navigate('/dashboard/settings')}/>
            </div>
        </div>
      </div>
      <div className='text-white w-11/12 flex mt-3 justify-center items-center' >
        <div className='bg-richblack-800 py-5 w-[80%] flex justify-between pl-10 pr-4 rounded-md border-[1px] border-richblack-700'>
            <div className='flex flex-col gap-3 items-start '>
              <div className=''>
                <h2 className='text-2xl'>About </h2>
              </div>
              <p  className='text-richblack-500'> {user?.additionalDetails?.about  ??  "Write Something about Yourself"}</p>
            </div>
            <div className='flex gap-3 justify-center items-start '>
              <IconBtn icon={<FaEdit />} active={true} text={"Edit"} onclick={()=>navigate('/dashboard/settings')}/>
            </div>
        </div>
      </div>
      <div className='text-white w-11/12 flex mt-3 mb-5 justify-center items-center' >
        <div className='bg-richblack-800 py-5 w-[80%] flex justify-between pl-10 pr-4 rounded-md border-[1px] border-richblack-700'>
            <div className='flex flex-col  gap-3 w-full'>
              <h2 className='text-2xl'> Personal Details</h2>
              <div className='flex justify-between mr-2 mt-1'>
                <div className='flex flex-col gap-5' >
                  <div className=''>
                    <p  className='text-richblack-500'>First Name</p>
                    <p>{user?.firstName}</p>
                  </div>
                  <div className=''>
                    <p  className='text-richblack-500'>Email</p>
                    <p>{user?.email} </p>
                  </div>
                  <div className='' >
                    <p  className='text-richblack-500'>Gender</p>
                    <p>{user?.additionalDetails?.gender?? "Enter Your Gender"} </p>
                  </div>
                </div>
                <div className='flex flex-col gap-5' >
                  <div>
                    <p  className='text-richblack-500'>Last Name</p>
                    <p>{user?.lastName}</p>
                  </div>
                  <div className=''>
                    <p  className='text-richblack-500'>Phone Number</p>
                    <p>{user?.additionalDetails?.contactNumber ?? "Enter Your Number"} </p>
                  </div>
                  <div>
                    <p  className='text-richblack-500'>Date Of Birth</p>
                    <p>{user?.additionalDetails?.dob?? "Enter Your DOB"} </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-3 justify-center items-start '>
              <IconBtn icon={<FaEdit />} active={true} text={"Edit"} onclick={()=>navigate('/dashboard/settings')}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile