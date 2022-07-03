"use strict"
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/users-curd',{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("database is connected");
    }else{
        console.log(err);
    }
})


