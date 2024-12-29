import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../services/operations/SettingsAPI"
import IconBtn from "../../../comp/common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    // console.log("password Data - ", data)
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-8 w-full flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="lable-style text-richblack-5 ">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style px-2 text-richblack-900 py-1 "
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[32px] z-[10] cursor-pointer py-1"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="text-richblack-900" />
                ) : (
                  <AiOutlineEye fontSize={24} fill=" text-richblack-900" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-5">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="lable-style text-richblack-5">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style px-2 text-richblack-900 py-1"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-2 top-[32px] z-[10] cursor-pointer py-1 "
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill=" text-richblack-900" />
                ) : (
                  <AiOutlineEye fontSize={24} fill=" text-richblack-900" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="confPassword" className="lable-style text-richblack-5">
                Confirm Password
              </label>
              <input
                type={showConfPassword ? "text" : "password"}
                name="confPassword"
                id="confPassword"
                placeholder="Enter New Password"
                className="form-style px-2 text-richblack-900 py-1"
                {...register("confPassword", { required: true })}
              />
              <span
                onClick={() => setShowConfPassword((prev) => !prev)}
                className="absolute right-2 z-[10] cursor-pointer py-9  text-richblack-900"
              >
                {showConfPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="text-richblack-900" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="text-richblack-900" />
                )}
              </span>
              {errors.confPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>

        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 my-3 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  )
}