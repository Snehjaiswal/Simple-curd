"use strict"
require("./DB")
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userModel = require('./Curd/Model')
const {  verifyToken, upload } = require('./Middleware/middleware')

// Router
app.use(require("./Login/loginController"));
app.use(require("./Curd/Curd"));
app.use(require("./uploads/upload"));
app.use(require("./Search/Search"));


// Middlewre call
app.post("/welcome", verifyToken, async (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});


// Port
app.listen(4000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("server is running...");
    }
})