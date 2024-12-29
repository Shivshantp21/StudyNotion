import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from '../../../common/IconBtn';
import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"

// const RenderTotalAmount = () => {

//     const {total, cart} = useSelector((state) => state.cart);


//     const handleBuyCourse = () => {
//         const courses = cart.map((course) => course._id);
//         console.log("Bought these course:", courses);
//         //TODO: API integrate -> payment gateway tak leke jaegi
//     }
//   return (
//     <div>

//         <p>Total:</p>
//         <p>Rs {total}</p>

//         <IconBtn 
//             text="Buy Now"
//             onclick={handleBuyCourse}
//             customClasses={"w-full justify-center"}
//         />
        
//     </div>
//   )
// }

// export default RenderTotalAmount


export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className='w-full flex justify-end mr-32'>
      <div className="min-w-[80px] justify-center items-center flex rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
      <p className=" text-3xl font-medium text-richblack-300">Total:</p>
      <p className=" text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
    </div>
  )
}


