import React from 'react'

const IconBtn = ({
    active,
    icon,
    text,
    onclick,
    children,
    disabled,
    add,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <button  className={`p-4 rounded-md text-lg flex gap-3 font-bold items-center m-3 ${active ? "  bg-yellow-50 text-black":" bg-black/50 text-white"}`}
    disabled={disabled}
    onClick={onclick}
    type={type}>
        {
            children ? (
                <>
                    <span >
                        {text}
                    </span>
                    {children}
                </>
            ) : (
                    <div className='flex justify-center items-center gap-2'>
                    <p>{text}</p>
                    <p>{icon}</p>
                    </div>
                )
        }
    </button>
  )
}

export default IconBtn
