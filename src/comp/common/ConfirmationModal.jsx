// import React from 'react'
// import IconBtn from './IconBtn';
// const ConfirmationModal = ({modalData}) => {
//   return (
//     <div className='text-white flex flex-col ' >
//         <div className=' flex flex-col' >
//             <p>
//                 {modalData.text1}
//             </p>
//             <p>
//                 {modalData.text2}
//             </p>
//             <div className='flex gap-x-4'>
//                 <IconBtn onclick= {modalData?.btn1Handler} active={true} text= {modalData?.btn1Text}/>
//                 <IconBtn onclick= {modalData?.btn2Handler}
//                     text = {modalData?.btn2Text}
//                 />
//             </div>
//         </div>
//     </div>
//   )
// }

// export default ConfirmationModal

import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex -ml-3 items-center gap-x-14">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            active={true}
          />
          <button
            className="cursor-pointer rounded-md text-lg bg-richblack-200 py-[16px] px-[20px] font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
