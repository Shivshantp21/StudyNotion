const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () =>{
    mongoose.connect(process.env.URL)
    .then(()=>console.log("Db connected Successfully"))
    .catch((err)=>{
        console.log("Db can not be connected " , err);
        process.exit(1);
    })
}