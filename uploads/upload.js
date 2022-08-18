const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require("express").Router()

//Middlewre import
const { upload } = require('../Middleware/middleware')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// Upload single image
router.post('/upload', upload, (req, res) => {
    try {
        res.send('file upload')
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;