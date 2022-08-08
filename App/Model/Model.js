const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    FirstName:{
        // type: String,
        // require: true,
    },
    LastName:{
        // type: String,
        // require: true,
    },
    Email:{
        // type: String,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("invalid email");
        //     }
        // }

    },
    phoneNo:{
        // type: Number,
        // require: true,
    },
    birth_year:{
        
    }
})

const userModel = mongoose.model('Employee',userSchema);

module.exports = userModel;