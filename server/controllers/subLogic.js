const Section = require("../models/Section");
const subSection = require("../models/Subsection");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
require('dotenv').config();


exports.createSubSection = async(req,res) =>{
    try{

        const {sectionId ,title, description } = req.body;
        const video = req.files.video;

        if(!sectionId || !title || !description || !video){
            return res.status(404).json({
                success:false,
                message:"Fill all the details carefully"
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        const subDetails = await subSection.create({
            title:title,
            timeDuration: `${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })

        const updateSection = await Section.findByIdAndUpdate({_id:sectionId},
            {
                $push:{
                    subSection:subDetails._id,
                }
            },{new:true}
        ).populate('subSection')

        return res.status(200).json({
            success:true,
            message:'Sub Section Created Successfully',
            data: updateSection,
        });

    }catch(error){
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}

exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body

      const sub = await subSection.findById(subSectionId)
  
      if (!sub) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        sub.title = title
      }
  
      if (description !== undefined) {
        sub.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        sub.videoUrl = uploadDetails.secure_url
        sub.timeDuration = `${uploadDetails.duration}`
      }
  
      await sub.save();
      const updatedSection = await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            sub: subSectionId,
          },
        }
      )
      const sub = await subSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!sub) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
      const updatedSection = await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }