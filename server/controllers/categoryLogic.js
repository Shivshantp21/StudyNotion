const Category = require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

exports.createCategory = async(req , res) =>{
    try{
        const {name, description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        const categoryDetails = await Category.create({
            name:name,
            description:description,
        })
        console.log(categoryDetails);

        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

exports.showAllCategories = async(req,res) =>{
    try{
        const allCategory = await Category.find({} , {name:true, description:true});
        // const allCategory = await Category.find({});
        console.log("All category"+ allCategory);
        return res.status(200).json({
            success:true,
            message:"All category returned successfully",
            data:allCategory
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

// exports.categoryPageDetails = async(req,res) =>{
//     try{
//         const {categoryId} = req.body;
//         const selectedCategory = await Category.findById(categoryId)
//                                         // .populate('courses')
//                                         // .exec();
//         .populate({
//             path: "courses",
//             match: { status: "Published" },
//             populate: "ratingAndReviews",
//             })
//         .exec()
        
//         if(!selectedCategory){
//             return res.status(404).json({
//                 success:false,
//                 message:"Category Not found"
//             })
//         }

//         if (selectedCategory.courses.length === 0) {
//             console.log("No courses found for the selected category.")
//             return res.status(404).json({
//               success: false,
//               message: "No courses found for the selected category.",
//             })
//         }

//         // const differentCategory = await Category.find({
//         //     _id:{$ne:categoryId},
//         // }).populate('courses').exec()

//               // Get courses for other categories
//         const categoriesExceptSelected = await Category.find({
//             _id: { $ne: categoryId },
//         })
//         let differentCategory = await Category.findOne(
//             categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//             ._id
//         )
//             .populate({
//             path: "courses",
//             match: { status: "Published" },
//             })
//             .exec()
//             //console.log("Different COURSE", differentCategory)
//         // Get top-selling courses across all categories
//         const allCategories = await Category.find()
//             .populate({
//             path: "courses",
//             match: { status: "Published" },
//             populate: {
//                 path: "instructor",
//             },
//             })
//             .exec()
//         const allCourses = allCategories.flatMap((category) => category.courses)
//         const mostSellingCourses = allCourses
//             .sort((a, b) => b.sold - a.sold)
//             .slice(0, 10)

//         return res.status(200).json({
//             success:true,
//             data:{
//                 selectedCategory,
//                 differentCategory,
//                 mostSellingCourses,
//             },
//         });

//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message: "Internal server error",
//             error: error.message,
//         })
//     }
// }

// exports.categoryPageDetails = async (req, res) => {
//   try {
//     const { categoryId } = req.body
//     console.log("PRINTING CATEGORY ID: ", categoryId);
//     // Get courses for the specified category
//     const selectedCategory = await Category.findById(categoryId)
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//         populate: "ratingAndReviews",
//       })
//       .exec()

//     //console.log("SELECTED COURSE", selectedCategory)
//     // Handle the case when the category is not found
//     if (!selectedCategory) {
//       console.log("Category not found.")
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" })
//     }
//     // Handle the case when there are no courses
//     if (selectedCategory.courses.length === 0) {
//       console.log("No courses found for the selected category.")
//       return res.status(404).json({
//         success: false,
//         message: "No courses found for the selected category.",
//       })
//     }

//     // Get courses for other categories
//     const categoriesExceptSelected = await Category.find({
//       _id: { $ne: categoryId },
//     })
//     let differentCategory = await Category.findOne(
//       categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//         ._id
//     )
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//       })
//       .exec()
//       //console.log("Different COURSE", differentCategory)
//     // Get top-selling courses across all categories
//     const allCategories = await Category.find()
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//         populate: {
//           path: "instructor",
//       },
//       })
//       .exec()
//     const allCourses = allCategories.flatMap((category) => category.courses)
//     const mostSellingCourses = allCourses
//       .sort((a, b) => b.sold - a.sold)
//       .slice(0, 10)
//      // console.log("mostSellingCourses COURSE", mostSellingCourses)
//     res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory,
//         differentCategory,
//         mostSellingCourses,
//       },
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error hi",
//       error: error.message,
//     })
//   }
// }

// exports.categoryPageDetails = async (req, res) => {
//   try {
//     const { categoryId } = req.body
//     console.log("PRINTING CATEGORY ID: ", categoryId);
//     // Get courses for the specified category
//     const selectedCategory = await Category.findById(categoryId)
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//         populate: "ratingAndReviews",
//       })
//       .exec()

//     //console.log("SELECTED COURSE", selectedCategory)
//     // Handle the case when the category is not found
//     if (!selectedCategory) {
//       console.log("Category not found.")
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" })
//     }
//     // Handle the case when there are no courses
//     if (selectedCategory.courses.length === 0) {
//       console.log("No courses found for the selected category.")
//       return res.status(404).json({
//         success: false,
//         message: "No courses found for the selected category.",
//       })
//     }

//     // Get courses for other categories
//     const categoriesExceptSelected = await Category.find({
//       _id: { $ne: categoryId },
//     })
//     let differentCategory = await Category.findOne(
//       categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//         ._id
//     )
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//       })
//       .exec()
//       //console.log("Different COURSE", differentCategory)
//     // Get top-selling courses across all categories
//     const allCategories = await Category.find()
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//         populate: {
//           path: "instructor",
//       },
//       })
//       .exec()
//     const allCourses = allCategories.flatMap((category) => category.courses)
//     const mostSellingCourses = allCourses
//       .sort((a, b) => b.sold - a.sold)
//       .slice(0, 10)
//      // console.log("mostSellingCourses COURSE", mostSellingCourses)
//     res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory,
//         differentCategory,
//         mostSellingCourses,
//       },
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }


exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("Received categoryId:", categoryId);

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (selectedCategory.courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Get categories except the selected one
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = null;
    if (categoriesExceptSelected.length > 0) {
      const randomIndex = getRandomInt(categoriesExceptSelected.length);
      const randomCategoryId = categoriesExceptSelected[randomIndex]?._id;

      if (randomCategoryId) {
        differentCategory = await Category.findById(randomCategoryId)
          .populate({
            path: "courses",
            match: { status: "Published" },
          })
          .exec();
      }
    }

    // Get top-selling courses
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
