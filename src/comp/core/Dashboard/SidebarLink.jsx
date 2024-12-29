import React from 'react'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import * as Icons from 'react-icons/vsc';

const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }
  return (
    <NavLink to={link.path} className={` relative ${matchRoute(link.path)? 'bg-yellow-800':'bg-opacity-0'}`}>
        <span className={`h-full left-0 w-1 bg-yellow-5 absolute ${matchRoute(link.path)? 'opacity-100': 'opacity-0' }`} />
            
        <div className='flex ml-3 gap-3 items-center text-lg ' >
            <Icon/>
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink