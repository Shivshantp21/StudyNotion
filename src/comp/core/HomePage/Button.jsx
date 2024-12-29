import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({active, linkto, children , add}) => {
  return (
    <Link to={linkto}>
        <button  className={`p-2 rounded-md items-center m-3 ${add} ${active ? "bg-yellow-50 text-black":" bg-richblack-800 text-white"} `}>
            {children}
        </button>
    </Link>
  )
}

export default Button