const jwt = require("jsonwebtoken");
const Joi = require('joi')
const multer = require('multer')

const validationMiddleware = (req, res, next) => {
  console.log("hi")
  const schema = Joi.object().keys({
    FirstName: Joi.string().required().min(3).max(20),
    LastName: Joi.string().required().min(3).max(20),
    Email: Joi.string().required().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'in'] }
    })
  }).unknown(true)


  const { error, details } = schema.validate(req.body, { abortEarly: false })
  if (error) {
    res.status(200).json({ error: details + " Error" })
  } else {
    next()
  }
}



// Token vrifiction
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, 'abcdefgh');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


// Upload file
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg , .pdf , .png')
    }
  })
}).single('user_file')



// Email validation
function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}





module.exports = {
  validationMiddleware: validationMiddleware,
  verifyToken: verifyToken,
  upload:upload,
  validateEmail:validateEmail
}