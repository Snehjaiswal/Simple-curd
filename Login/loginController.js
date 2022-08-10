const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const loginModel = require('./loginModel')
const router = require("express").Router()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


router.get('/login',(req,res)=>{
    res.send("login")
})

router.post('/login', async(req,res)=>{
    try {
        const { name,email,password,Cpassword} = req.body;

        if (!name || !email || !password || !Cpassword)
        return res.status(400).json({ msg: "Please fill in all fields." });

        const user = await loginModel.findOne({ email });

        if (user)
        return res.status(400).json({ msg: "This email already exists." });

        const passwordHash = await bcrypt.hash(password, 10);
            const CpasswordHash = await bcrypt.hash(Cpassword, 10);
      
        if (password.length < 6)
        return res
            .status(400)
            .json({ msg: "Password must be at least 6 characters." });

        const login = new loginModel({
            name
           ,email
           ,password :passwordHash
           ,Cpassword :CpasswordHash
        })
        const token = jwt.sign(
            { user_id: login._id, email },
           'abcdefgh',
            {
              expiresIn: "2h",
            }
          );
          login.token= token;

       await login.save()
      
       res.status(201).json({ message: " registered successfuly" });
       console.log(login);


    } catch (error) {
        console.log(error);
    }
})

router.post('/signin',async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await loginModel.findOne({
               email: email 
                
        });
        if (!user)
        return res.status(400).json({ msg: "This email in not Verified." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Password is incorrect." });


            // const token = jwt.sign(
            //     { user_id: user._id, email },
            //     'abcdefgh',
            //     {
            //       expiresIn: "2h",
            //     }
            //   );
        
            //   // save user token
            //   user.token = token;
     
            res.json({ msg: "Login success!" });
            console.log(`Login Success!`);

    } catch (error) {
        console.log(error);
    }
})




module.exports = router;