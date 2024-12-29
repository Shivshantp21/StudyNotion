const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/Subsection");

exports.createSection = async(req,res) =>{
    try{
        const{sectionName , courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing values"
            })
        }

        const newSection = await Section.create({sectionName});

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },{new:true}
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();


        return res.status(200).json({
            success:true,
            message:"Section Created successfully",
            updatedCourse,
        })
    }catch(error){
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
        
    }
}

exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();
		
		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};


// exports.deleteSection = async (req,res) => {
//     try {
//         //get ID - assuming that we are sending ID in params
//         const {sectionId} = req.params
//         //use findByIdandDelete
//         await Section.findByIdAndDelete(sectionId);
//         //TODO[Testing]: do we need to delete the entry from the course schema ??
//         //return response
//         return res.status(200).json({
//             success:true,
//             message:"Section Deleted Successfully",
//         })

//     }
//     catch(error) {
//         return res.status(500).json({
//             success:false,
//             message:"Unable to delete Section, please try again",
//             error:error.message,
//         });
//     }
// }


exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		// await SubSectionModal.deleteMany({_id: {$in: section.subSection}});
		await SubSection.deleteMany({_id: {$in: section.subSection}});
		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});





		//HW -> req.params -> test
		// const { sectionId } = req.params;
		// await Section.findByIdAndDelete(sectionId);
		// //HW -> Course ko bhi update karo
		// res.status(200).json({
		// 	success: true,
		// 	message: "Section deleted",
		// });
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};