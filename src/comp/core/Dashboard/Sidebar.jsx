import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {SidebarLinks} from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import { VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import {logout} from "../../../services/operations/authApi";
import ConfirmationModal from '../../common/ConfirmationModal';




const Sidebar = () => {
    const {loading: authLoading} = useSelector(state => state.auth);
    const {user, loading : profileLoading} = useSelector(state => state.profile);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if(profileLoading || authLoading){
        return(
            <div>
                Loading...
            </div>
        )
    }
  return (
    <div className=''>
        <div className=' bg-richblack-800 py-5 w-[222px] h-[calc(100vh-3.5rem)] '>
            <div className='text-white flex flex-col mt-5 gap-5 relative'>
                {
                    SidebarLinks.map((link)=>{

                        if(link.type && user?.accountType !== link.type) return null;
                        return(
                            <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                        )
                    })
                }
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-full bg-richblack-600'></div>

            <div className='flex flex-col gap-5 '>
                <SidebarLink link = {{name:"Settings",path:"dashboard/settings"}} iconName="VscSettingsGear"/>
                <button onClick={()=> setConfirmationModal({
                    text1: "Are You Sure ?",
                    text2: "You will be logged out of your Account",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () =>{
                        dispatch(logout(navigate));
                        setConfirmationModal(null)
                    },
                    btn2Handler: () => setConfirmationModal(null),
                })}>
                    <div className='flex items-center text-xl ml-3 text-richblack-5 gap-x-3'>
                        <VscSignOut/>
                        <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar