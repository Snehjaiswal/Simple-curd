"use strict"

const express = require('express')
const app = express()
require("./DB")
const userModel = require('./model')

app.use(express.json());


app.get('/', async (req,res)=>{
   const user = await userModel.find();
   console.log(user);
})



app.post('/',(req,res)=>{
    const {FirstName,LastName} = req.body;
  
    const users = new userModel({
        FirstName,
        LastName
    })

    users.save();
    console.log({users});
})

app.put('/:id',async(req,res)=>{
   
    try {
        const verifyAccount =await userModel.findByIdAndUpdate(req.params.id , req.body)
    
    console.log({verifyAccount});
    } catch (error) {
        console.log(error);
    }
})

app.delete('/:id',async(req,res)=>{
    try {
        const userDelete =await userModel.findByIdAndDelete(req.params.id)
        if(userDelete){
            console.log("Delete Success");
        }else{
            console.log("error");
        }
        
        console.log(userDelete)
    } catch (error) {
        console.log({error});
    }
})

app.listen(4000,console.log("server is sunning"))