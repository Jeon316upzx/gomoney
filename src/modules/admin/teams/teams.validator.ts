import Joi from 'joi'



export const teamSchema = Joi.object().keys({
    team_title: Joi.string().required(),
    slogan: Joi.string().required(), 
    year_founded: Joi.string().required(),
    flag_thumbnail: Joi.string().required(),
    owner: Joi.string().required(),
    made_by: Joi.string().required()
})







