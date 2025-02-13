const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section")
const SubSection = require("../models/Subsection")
const CourseProgress = require("../models/CourseProgress")
const { uploadImageToCloudinary } = require("../utils/imageUpload");
const { convertSecondsToDuration } = require("../utils/secToDuration")
require('dotenv').config();


// exports.createCourse = async(req,res) =>{
//     try{
//         const {courseName,instructions,status,courseDescription, price,category,tag,whatYoutWillLearn} = req.body;

//         const thumbnail = req.files.thumbnailImage;

//         if(!courseName || !courseDescription || !tag || !whatYoutWillLearn || !price || !category){
//             return res.status(400).json({
//                 success:false,
//                 message:"Enter all details carefully"
//             })
//         }

//         if (!status || status === undefined) {
// 			status = "Draft";
// 		}

//         const userId = req.user.id;
//         const instructor = await User.findById(userId,{
//                 accountType: "Instructor",
//             }
//         );
//         console.log("Instructor Details ", instructor);

//         if(!instructor){
//             return res.status(404).json({
//                 success:false,
//                 message:"Instructor details not found"
//             })
//         }

//         const categoryDetails = await Category.findById(category);
//         if(!categoryDetails){
//             return res.status(404).json({
//                 success:false,
//                 message:"category details not found"
//             })
//         }

//         const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

//         const newCourse = await Course.create({
//             courseName,
//             courseDescription,
//             instructor: instructor._id,
//             whatYouLearn: whatYoutWillLearn,
//             price,
//             tag:tag,
//             category:categoryDetails._id,
//             thumbnail:thumbnailImage.secure_url,
//             status: status,
// 			instructions: instructions,
//         })

//         await User.findByIdAndUpdate(
//             {_id:instructor._id},
//             { 
//                 $push:{
//                     courses:newCourse._id
//                 }
//             },
//             {new:true},
//         )
//         return res.status(200).json({
//             success:true,
//             message:"Course created successfully",
//             data:newCourse
//         })
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success:false,
//             message:'Failed to create a new course'
//         })
//     }
// }

exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
		} = req.body;

		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

		// Check if any of the required fields are missing
		if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag.length ||
            !thumbnail ||
            !category ||
            !instructions.length
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);
		// Create a new course with the given details
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions,
		});

    await Category.findByIdAndUpdate(
      newCourse.category,
      { $addToSet: { courses: newCourse._id } } // $addToSet ensures no duplicates
    );

		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Add the new course to the Categories
        const categoryDetails2 = await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
		// Return the new course and a success message
        console.log("HEREEEEEEEE", categoryDetails2)
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};

exports.getAllCourses = async(req,res) =>{
    try{
        const allCourses = await Course.find(
            { status: "Published"},
            {
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnrolled: true,
			}
        ).populate("instructor")
        .exec();

        return res.status(200).json({
            success:true,
            message:"Data for all courses is here",
            data:allCourses,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch the course data",
            error:error.message,
        })
    }
}


exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.body;
            //find course details
            const courseDetails = await Course.findOne({
                _id: courseId,
            })
            .populate({
                path: "instructor",
                populate: {
                path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                path: "subSection",
                select: "-videoUrl",
                },
            })
            .exec()

            //validation
            if(!courseDetails) {
                return res.status(400).json({
                    success:false,
                    message:`Could not find the course with ${courseId}`,
                });
            }

                    
            let totalDurationInSeconds = 0
            courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
            })

            const totalDuration = convertSecondsToDuration(totalDurationInSeconds)


            //return response
            return res.status(200).json({
                success:true,
                message:"Course Details fetched successfully",
                data: {
                    courseDetails,
                    totalDuration,
                },
            })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

// ADD new on ourself
// exports.updateCourse = async (req, res) => {
//     try {
//         // Get user ID from request object
//         const userId = req.user.id;

//         // Get course ID from request parameters
//         const { courseId } = req.body;
// 		console.log(courseId)

//         // Get updated fields from request body
//         const {
//             courseName,
//             courseDescription,
//             whatYouWillLearn,
//             price,
//             tag,
//             category,
//             status,
//             instructions,
//         } = req.body;

//         // Get thumbnail image from request files (if provided)
//         const thumbnail = req.files?.thumbnailImage;

//         // Check if the course exists
//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Course not found",
//             });
//         }

//         // Check if the user is the instructor of the course
//         if (course.instructor.toString() !== userId) {
//             return res.status(403).json({
//                 success: false,
//                 message: "You are not authorized to update this course",
//             });
//         }

//         // Check if the category exists (if provided)
//         if (category) {
//             const categoryDetails = await Category.findById(category);
//             if (!categoryDetails) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "Category not found",
//                 });
//             }
//         }

//         // Upload new thumbnail to Cloudinary (if provided)
//         let thumbnailImage;
//         if (thumbnail) {
//             thumbnailImage = await uploadImageToCloudinary(
//                 thumbnail,
//                 process.env.FOLDER_NAME
//             );
//         }

//         // Update the course details
//         const updatedCourse = await Course.findByIdAndUpdate(
//             courseId,
//             {
//                 ...(courseName && { courseName }),
//                 ...(courseDescription && { courseDescription }),
//                 ...(whatYouWillLearn && { whatYouWillLearn }),
//                 ...(price && { price }),
//                 ...(tag && { tag }),
//                 ...(category && { category }),
//                 ...(status && { status }),
//                 ...(instructions && { instructions }),
//                 ...(thumbnailImage && { thumbnail: thumbnailImage.secure_url }),
//             },
//             { new: true } // Return the updated document
//         );

//         // Return the updated course and a success message
//         res.status(200).json({
//             success: true,
//             data: updatedCourse,
//             message: "Course updated successfully",
//         });
//     } catch (error) {
//         // Handle any errors that occur during the update of the course
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to update course",
//             error: error.message,
//         });
//     }
// };

// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  // Get a list of Course for a given Instructor
  // exports.getInstructorCourses = async (req, res) => {
  //   try {
  //     // Get the instructor ID from the authenticated user or request body
  //     const instructorId = req.user.id
  
  //     // Find all courses belonging to the instructor
  //     const instructorCourses = await Course.find({
  //       instructor: instructorId,
  //     }).sort({ createdAt: -1 })
  
  //     // Return the instructor's courses
  //     res.status(200).json({
  //       success: true,
  //       data: instructorCourses,
  //     })
  //     console.log("Instructor",instructorCourses)
  //   } catch (error) {
  //     console.error(error)
  //     res.status(500).json({
  //       success: false,
  //       message: "Failed to retrieve instructor courses",
  //       error: error.message,
  //     })
  //   }
  // }
  
  // Helper function to convert seconds to human-readable forma

exports.getInstructorCourses = async (req, res) => {
  try {

    const convertSecondsToDuration = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
    
      let duration = "";
      if (hrs > 0) duration += `${hrs}h `;
      if (mins > 0) duration += `${mins}m `;
      if (secs > 0) duration += `${secs}s`;
    
      return duration.trim();
    };
    
    const instructorId = req.user.id;

    // Fetch instructor courses with nested population
    let instructorCourses = await Course.find({ instructor: instructorId })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .sort({ createdAt: -1 })
      .exec();

    // Process each course to calculate totalDuration
    instructorCourses = instructorCourses.map((course) => {
      // Initialize total duration
      let totalDurationInSeconds = 0;

      course.courseContent.forEach((content) => {
        // Ensure subSection is an array and has valid data
        if (Array.isArray(content.subSection)) {
          totalDurationInSeconds += content.subSection.reduce((acc, sub) => {
            // Parse timeDuration and fallback to 0 if invalid
            const duration = parseInt(sub.timeDuration, 10) || 0;
            return acc + duration;
          }, 0);
        }
      });

      // Convert Mongoose document to plain object for modification
      course = course.toObject();

      // Add totalDuration in human-readable format
      course.totalDuration = totalDurationInSeconds
        ? convertSecondsToDuration(totalDurationInSeconds)
        : "0s";

      return course;
    });

    // Send response
    return res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error("Error in getInstructorCourses:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


  // Delete the Course
  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }