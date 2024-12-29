import React from 'react'

const Highlight = ({text,color="text-blue-200" ,style}) => {
  return (
    <span className={`${color} font-bold`} style={style}>
        {' '}
        {text}
    </span>
  )
}

export default Highlight