"use strict"
const mongoose = require('mongoose')

let str = 'mongodb+srv://sneh2002:sneh2002@mern-database.cujh8.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(str,{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("database is connected");
    }else{
        console.log(err);
    }
})


