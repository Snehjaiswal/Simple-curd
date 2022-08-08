"use strict"
require("./App/utils/DB")
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userModel = require('./App/Model/Model')
const { validationMiddleware } = require('./App/Middleware/middleware')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// Api get data
app.get('/', async (req, res) => {
    try {
        const user = await userModel.find();
        res.json(user).status(200)
        console.log(`run success`);
    } catch (error) {
        console.log(error);
    }

})


// Api post data
app.post("/", validationMiddleware, async (req, res) => {
    try {
        const { FirstName, LastName, Email, phoneNo ,birth_year} = req.body;

        // EMAIL VALIDATER
        //   if (!validateEmail(Email))
        //   return res.status(400).json({ msg: "Invalid emails." });
        const users = new userModel({
            FirstName,
            LastName,
            Email,
            phoneNo,
            birth_year
        })

        await users.save()
        res.status(201).json({ message: " registered successfuly" });
        console.log(users);

    } catch (error) {
        console.log(error);
    }

})

// Api put data
app.put('/:id', async (req, res) => {

    try {
        const verifyAccount = await userModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({ message: "update successfuly" });
        console.log({ verifyAccount });
    } catch (error) {
        console.log(error);
    }
})

// Api delete data
app.delete('/:id', async (req, res) => {
    try {
        const userDelete = await userModel.findByIdAndDelete(req.params.id)
        res.status(201).json({ message: "delete successfuly" });
        console.log({ userDelete });

    } catch (error) {
        console.log({ error });
    }
})

// Api search data
app.get('/search/:key', async (req, res) => {
    console.log('RUN');
    try {
        const searchUser = await userModel.find(

            {
                "$or": [
                    { "FirstName": { $regex: req.params.key } },
                    { "LasttName": { $regex: req.params.key } },

                ]
            }
        )
        res.status(201).json({ message: "SEARCH successfuly" });
        console.log({ searchUser });

    } catch (error) {
        console.log({ error });
    }
})



// Email validation
// function validateEmail(email) {
//     const re =
//         /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
// }




app.listen(4000, console.log("server is sunning"))