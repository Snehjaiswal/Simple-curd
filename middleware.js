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

module.exports = {
    validationMiddleware:validationMiddleware
}