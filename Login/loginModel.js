const mongoose = require('mongoose')

const loginSchema =  mongoose.Schema({
    name:{type:String},
    email:{},
    password:{},
    Cpassword:{},
    token: { type: String }
})

const loginModel = mongoose.model('login',loginSchema)
module.exports= loginModel;