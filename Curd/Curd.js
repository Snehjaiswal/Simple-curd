const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require("express").Router()

//Middlewre import
const { validationMiddleware, verifyToken, upload } = require('../Middleware/middleware')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// Api get data
router.get('/', async (req, res) => {
    try {
        const user = await userModel.find();
        res.json(user).status(200)
        console.log(`run success`);
    } catch (error) {
        console.log(error);
    }
})

// Get data usin id
router.get('/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.json(user).status(200)
        console.log(`run success`);
    } catch (error) {
        console.log(error);
    }
})

// Api post data
router.post("/", validationMiddleware, async (req, res) => {
    try {
        const { FirstName, LastName, Email, phoneNo, birth_year } = req.body;

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
router.put('/:id', async (req, res) => {

    try {
        const verifyAccount = await userModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({ message: "update successfuly" });
        console.log({ verifyAccount });
    } catch (error) {
        console.log(error);
    }
})

// Api delete data
router.delete('/:id', async (req, res) => {
    try {
        const userDelete = await userModel.findByIdAndDelete(req.params.id)
        res.status(201).json({ message: "delete successfuly" });
        console.log({ userDelete });

    } catch (error) {
        console.log({ error });
    }
})



module.exports = router;