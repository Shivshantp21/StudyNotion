import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="flex mt-5 flex-col items-center w-11/12 px-4 py-3 text-black">
      <h1 className="mb-5 -ml-[700px] text-2xl text-richblack-5 flex flex-col "> 
        Edit Profile
      </h1>
      <div className="text-white w-[75%] flex flex-col mt-3 justify-center">
        {/* Change Profile Picture */}
        <ChangeProfilePicture />
        {/* Profile */}
        <EditProfile />
        {/* Password */}
        <UpdatePassword />
        {/* Delete Account */}
        <DeleteAccount />
      </div>
    </div>
  )
}