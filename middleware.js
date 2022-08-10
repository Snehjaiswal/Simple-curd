const jwt = require("jsonwebtoken");
const Joi = require('joi')

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
        res.status(200).json({ error: details+" Error"})
    } else {
        next()
    }
}




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


module.exports = {
    validationMiddleware:validationMiddleware,
    verifyToken:verifyToken
}