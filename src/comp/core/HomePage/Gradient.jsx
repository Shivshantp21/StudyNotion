import React from 'react';

const Gradient = ({position,size,value}) => {
  return (
    <div className=" w-full h-full flex">
      <div className={ ` absolute bg-blue-500 rounded-full ${size} items-center ${position} ${value}  blur-3xl `} ></div>
    </div>
  );
};

export default Gradient;
