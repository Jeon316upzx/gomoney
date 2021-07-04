import Joi from 'joi'



export const registrationSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(), 
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5)
})


export const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5)
})






