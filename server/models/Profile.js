const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender: {
        type:String,
    },
    dob:{
        type:String,
    },
    about:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:Number,
        trim:true,
    },
    image:{
        type:String
    }

})

module.exports = mongoose.model('Profile' , profileSchema)