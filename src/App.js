import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./comp/common/Navbar";
import OpenRoute from "./comp/core/Auth/OpenRoute"
import PrivateRoute from "./comp/core/Auth/PrivateRoute"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./comp/core/Dashboard/MyProfile";
import Error from '../src/pages/Error';
import Settings from "./comp/core/Settings/index";
import { ACCOUNT_TYPE } from "./utilis/constants";
import Cart from "./comp/core/Dashboard/Cart/index";
import EnrolledCourse from "./comp/core/Dashboard/EnrolledCourse";
import { useSelector } from "react-redux";
import AddCourse from "./comp/core/Dashboard/AddCourse";
import MyCourses from "./comp/core/Dashboard/MyCourses";
import EditCourse from "./comp/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./comp/core/ViewCourse/VideoDetails";
import Instructor from './comp/core/Dashboard/Instructor'

function App() {
  const {user} = useSelector((state)=>state.profile);
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="catalog/:catalogName" element={<Catalog/>} />
      <Route path="courses/:courseId" element={<CourseDetails/>} />
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
      <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />

      <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ResetPassword />
              </OpenRoute>
            }
          />  

        <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />  

      <Route
            path="update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />  
      
      <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&(
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourse />} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="dashboard/add-course" element={<AddCourse/>} />
              <Route path="dashboard/my-courses" element={<MyCourses/>} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              <Route path="dashboard/instructor" element={<Instructor />} />
              
              </>
            )
          }

        </Route>

        
      <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails/> }
          />
          </>
        )
      }

      </Route>


    

    <Route path="*" element={<Error/>} /> 
    </Routes>

   </div>
  );
}

export default App;  
