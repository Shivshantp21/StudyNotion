import React from 'react';
import Sidebar from '../comp/core/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const {loading: authLoading} = useSelector(state => state.auth);
    const {loading : profileLoading} = useSelector(state => state.profile);

    if(profileLoading || authLoading){
        return(
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

  return (
    <div className='text-white flex'>
        <div className=''>
            <Sidebar/>
        </div>
        <div className='flex justify-center items-center w-full '>
            <Outlet/>
        </div>

    </div>
  )
}

export default Dashboard