const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Change to match your collection name
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Change to match your collection name
    required: true,
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subSection", // Change to match your collection name
      required: true,
    },
  ],
});

// Explicitly set the collection name to match the one in the database
module.exports = mongoose.model("courseProgress", courseProgress);
