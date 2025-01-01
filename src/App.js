import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./comp/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./comp/core/Dashboard/MyProfile";
import Error from '../src/pages/Error';
import Settings from "./comp/core/Settings/index";
import Cart from "./comp/core/Dashboard/Cart/index";
import EnrolledCourse from "./comp/core/Dashboard/EnrolledCourse";
import AddCourse from "./comp/core/Dashboard/AddCourse";
import MyCourses from "./comp/core/Dashboard/MyCourses";
import EditCourse from "./comp/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./comp/core/ViewCourse/VideoDetails";
import Instructor from './comp/core/Dashboard/Instructor';

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="update-password/:id" element={<UpdatePassword />} />

        <Route path="dashboard" element={<Dashboard />}>
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="cart" element={<Cart />} />
          <Route path="enrolled-courses" element={<EnrolledCourse />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="edit-course/:courseId" element={<EditCourse />} />
          <Route path="instructor" element={<Instructor />} />
        </Route>

        <Route path="view-course/:courseId" element={<ViewCourse />}>
          <Route path="section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
