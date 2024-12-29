import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";



export default function Cart() {

    const {total, totalItems} = useSelector((state)=>state.cart);


    // return (
    //     <div className="text-white">
    //         <h1> Your Cart</h1>
    //         <p>{totalItems} Courses in Cart</p>

    //         {total > 0 
    //         ? (<div>
    //             <RenderCartCourses />
    //             <RenderTotalAmount />
    //         </div>)
    //         : (<p>Your Cart is Empty</p>)}
    //     </div>
    // )


    return (
      <div className="relative w-full flex justify-center items-center bg-richblack-900">
        <div className="fixed top-20 left-28 flex w-[1100px] gap-[850px] ml-52 ">
          <h1 className="text-3xl font-medium text-richblack-5">Cart</h1>
          <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400 mt-1 -mr-10">
            {totalItems} Courses in Cart
          </p>
        </div>
        {total > 0 ? (
          <div className="mt-28 flex items-center justify-center gap-x-10 gap-y-6 flex-col w-[90%] h-full">
            <RenderCartCourses />
            <RenderTotalAmount />
          </div>
        ) : (
          <p className="mt-10 text-center text-3xl text-richblack-100">
            Your cart is empty
          </p>
        )}
      </div>


    )
}