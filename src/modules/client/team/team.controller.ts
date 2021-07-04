import teamModel from "../../../models/Team.model";
import { Request , Response } from 'express';
import { HTTP } from "../../../constants/statuscode";
import { rResponse } from "../../../constants/response";
import { redisClient } from "../../../helpers/redis_client";




export const viewTeam = async( req: Request, res: Response ) =>{

    let team = await teamModel.findOne({ _id: req.params.id })

    if(!team){
        return res
            .status(HTTP.BAD_REQUEST)
            .send({
                data: null,
                message: "Team does not exist",
                status: rResponse.ERROR
            })
    }

    return res
            .status(HTTP.OK)
            .send({
                data: {
                    team:team
                },
                message: "Success",
                status: rResponse.SUCCESS
            })
}


export const viewTeams = async( req: Request, res: Response ) => {
    
    await redisClient.get('teams', (err, data)=>{
        if(data){
            console.log(data)
            return res
            .status(HTTP.OK)
            .send({
                data: {
                    teams: JSON.parse(data)
                },
                message: "Success",
                status: rResponse.SUCCESS
            })
        }
    })

    let teams = await teamModel.find({})

    await redisClient.set('teams', JSON.stringify(teams), 'EX', 10*60 )

    return res
            .status(HTTP.OK)
            .send({
                data: {
                    teams:teams
                },
                message: "Success",
                status: rResponse.SUCCESS
            })
}


export const searchTeams = async( req: Request, res: Response ) => {

    let query = req.query.q

    await redisClient.get('search', (err, data)=>{
        if(data){
            console.log(data)
            return res
            .status(HTTP.OK)
            .send({
                data: {
                    teams: JSON.parse(data)
                },
                message: "Success",
                status: rResponse.SUCCESS
            })
        }
    })
    
    let teams = await teamModel
    .find({ 
        $or:[
        { team_title: { $regex: ".*" + query + ".*" } },
        { slogan: { $regex: ".*" + query + ".*" } },
        { owner: { $regex: ".*" + query + ".*" } } ] 
       })


    await redisClient.set('search', JSON.stringify(teams), 'EX', 2*60 )

    return res
            .status(HTTP.OK)
            .send({
                data: {
                    teams: teams
                },
                message: "Success",
                status: rResponse.SUCCESS
            })
}



