import teamModel from "../../../models/Team.model";
import { teamSchema } from "./teams.validator";
import { Request , Response } from 'express';
import { HTTP } from "../../../constants/statuscode";
import { rResponse } from "../../../constants/response";

export const addTeam = async ( req: Request, res: Response) => {

    const { 

        team_title,
        slogan,
        year_founded,
        flag_thumbnail,
        owner,
        made_by

    } = req.body


    const result = teamSchema.validate(req.body);

    const { value, error } = result; 
    const valid = error == null; 

    if (!valid) { 
            return res
                    .status(HTTP.MISSING_PARAMS)
                    .send({
                                data: null,
                                message: "Oops! some required fields are missing",
                                status: rResponse.ERROR
                        })
    }


    const teamexists = await teamModel.findOne({ team_title  });

    if(teamexists){
        return res
        .status(HTTP.CONFLICT)
        .send({
            data: null,
            message: "A team with this team title already exist",
            status: rResponse.ERROR
        })
    }

    const newteam = new teamModel({
        team_title: team_title,
        slogan: slogan,
        year_founded: year_founded,
        flag_thumbnail: flag_thumbnail,
        owner: owner,
        made_by: made_by
    })



    newteam.save().then((result:any) =>{
        return res
        .status(HTTP.CREATED)
        .send({
            data: result,
            message: "Team created Successfully",
            status: rResponse.SUCCESS
        })
    }).catch((error:any)=>{
        return res
        .status(HTTP.BAD_REQUEST)
        .send({
            data: error,
            message: error.message,
            status: rResponse.ERROR
        })
    })

    


}


export const removeTeam = async( req: Request, res: Response ) =>{
    
    await teamModel.findOneAndDelete({ _id: req.params.id })
   .exec()
   .then(( result:any ) => {
    return res
            .status(HTTP.ACCEPTED)
            .send({
                data: null,
                message: "Team successfully deleted",
                status: rResponse.SUCCESS
            })
   })
   .catch((err :any ) => {
            return res
            .status(HTTP.BAD_REQUEST)
            .send({
                data: null,
                message: "Sorry, deletion was not successful",
                status: rResponse.ERROR
            })
   });
}


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


export const viewTeams = async( req: Request, res: Response ) =>{

    let teams = await teamModel.find({})

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


export const editTeam = async( req: Request, res: Response ) => {
   


    const result = teamSchema.validate(req.body);

    const { value, error } = result; 
    const valid = error == null; 

    if (!valid) { 
            return res
                    .status(HTTP.MISSING_PARAMS)
                    .send({
                                data: null,
                                message: "Oops! some required fields are missing",
                                status: rResponse.ERROR
                        })
    }


    await teamModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, updatedteam) {
        if(err){
            return res
                    .status(HTTP.BAD_REQUEST)
                    .send({
                                data: null,
                                message: "Update was not completed.",
                                status: rResponse.ERROR
                        })
        }



        return res
        .status(HTTP.ACCEPTED)
        .send({
            data: result,
            message: "Team Successfully Updated",
            status: rResponse.SUCCESS
        })



      });

    


    
}


