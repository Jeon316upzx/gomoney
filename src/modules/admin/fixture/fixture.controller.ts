import fixtureModel from "../../../models/Fixture.model";
import { rResponse } from "../../../constants/response";
import { FIXTURE_STATUS } from "../../../constants/fixture";
import { HTTP } from "../../../constants/statuscode";
import { Request , Response } from 'express';
import { fixtureSchema } from "./fixture.validator";
import fixtureLinkModel from "../../../models/Fixturelink.model";
import teamModel from "../../../models/Team.model";
import shortid from 'shortid';


export const addFixture = async(req: Request, res: Response) => {

    const {
        team1,
        team2,
        fixture_date,
        fixture_status
    } = req.body

    const team1exists = await teamModel.findOne({ _id: team1 })
    const team2exists = await teamModel.findOne({ _id: team2 })

    if(!team1exists || !team2exists){
        return res
                    .status(HTTP.MISSING_PARAMS)
                    .send({
                                data: null,
                                message: "Oops! some required fields are missing",
                                status: rResponse.ERROR
                        })
    }


    let newfixture = new fixtureModel({
        team1: team1,
        team2: team2,
        fixture_date: fixture_date,
        fixture_status: fixture_status
    })


    newfixture.save().then((result:any) =>{
        return res
        .status(HTTP.CREATED)
        .send({
            data: result,
            message: "Fixture created successfully",
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


export const removeFixture = async(req: Request, res: Response) => {

   
    await fixtureModel.findOneAndDelete({ _id: req.params.id })
   .exec()
   .then(( result:any ) => {
    return res
            .status(HTTP.ACCEPTED)
            .send({
                data: null,
                message: "Fixture successfully deleted",
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


export const viewFixture = async( req: Request, res: Response ) =>{

    let fixture = await fixtureModel
    .findOne({ _id: req.params.id })
    .populate("team")

    if(!fixture){
        return res
            .status(HTTP.BAD_REQUEST)
            .send({
                data: null,
                message: "Fixture does not exist",
                status: rResponse.ERROR
            })
    }

    return res
            .status(HTTP.OK)
            .send({
                data: {
                    fixture: fixture
                },
                message: "Success",
                status: rResponse.SUCCESS
            })
}


export const viewFixtures = async( req: Request, res: Response ) =>{

    let fixtures = await fixtureModel
    .find({ })
    .populate("team")

    return res
            .status(HTTP.OK)
            .send({
                data: {
                    fixtures: fixtures
                },
                message: "Success",
                status: rResponse.SUCCESS
            })
}


export const editFixture = async( req: Request, res: Response ) => {
   


    const result = fixtureSchema.validate(req.body);

    const { value, error } = result; 
    const valid = error == null; 

    console.log(result)

    if (!valid) { 
            return res
                    .status(HTTP.MISSING_PARAMS)
                    .send({
                                data: null,
                                message: "Oops! some required fields are missing",
                                status: rResponse.ERROR
                        })
    }


    await fixtureModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, updatedteam) {
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
            message: "Fixture Successfully Updated",
            status: rResponse.SUCCESS
        })



      });

    


    
}


export const generateFixtureLink = async( req: Request, res: Response ) =>{

    let fixture = await fixtureModel
    .findOne({ _id: req.params.id })
    .populate("team")

    if(!fixture){
        return res
            .status(HTTP.BAD_REQUEST)
            .send({
                data: null,
                message: "Fixture does not exist",
                status: rResponse.ERROR
            })
    }


    let linkexists = await fixtureLinkModel.findOne({ fixture : fixture._id })

    if(linkexists){
        return res
            .status(HTTP.BAD_REQUEST)
            .send({
                data: null,
                message: "Fixture link already created",
                status: rResponse.ERROR
            })
    }

    let newlink = new fixtureLinkModel({
        fixture: fixture._id,
        unique_link: shortid.generate()
    })

    newlink.save().then((result:any) =>{
        return res
        .status(HTTP.CREATED)
        .send({
            data: result,
            message: "Fixture link created successfully",
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