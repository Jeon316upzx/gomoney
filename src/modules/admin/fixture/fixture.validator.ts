import Joi from 'joi'



export const fixtureSchema = Joi.object().keys({
    team1: Joi.string().required(),
    team2: Joi.string().required(), 
    fixture_date: Joi.date().required(),
    fixture_status: Joi.string().required(),
    made_by:Joi.string().required()
})







