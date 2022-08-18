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

// Api search data
router.get('/search/:key', async (req, res) => {
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



module.exports = router;