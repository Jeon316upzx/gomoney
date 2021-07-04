import fixtureModel from "../../../models/Fixture.model";
import { rResponse } from "../../../constants/response";
import { FIXTURE_STATUS } from "../../../constants/fixture";
import { HTTP } from "../../../constants/statuscode";
import { Request , Response } from 'express';
// import { redisClient } from "../../../helpers/redis_client";


export const viewPendingFixtures = async( req: Request, res: Response ) =>{

    // await redisClient.get('pending', (err, data)=>{
    //     if(data){
    //         console.log(data)
    //         return res
    //         .status(HTTP.OK)
    //         .send({
    //             data: {
    //                 fixtures: JSON.parse(data)
    //             },
    //             message: "Success",
    //             status: rResponse.SUCCESS
    //         })
    //     }
    // })

    let fixtures = await fixtureModel
    .find({ fixture_status: FIXTURE_STATUS.PENDING })
    .populate("team1")
    .populate("team2")

    // await redisClient.set('pending', JSON.stringify(fixtures), 'EX', 10*60 )


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


export const viewCompletedFixtures = async( req: Request, res: Response ) =>{

    // await redisClient.get('completed', (err, data)=>{
    //     if(data){
    //         console.log(data)
    //         return res
    //         .status(HTTP.OK)
    //         .send({
    //             data: {
    //                 fixtures: JSON.parse(data)
    //             },
    //             message: "Success",
    //             status: rResponse.SUCCESS
    //         })
    //     }
    // })


    let fixtures = await fixtureModel
    .find({ fixture_status: FIXTURE_STATUS.COMPLETED })
    .populate("team1")
    .populate("team2")

    // await redisClient.set('completed', JSON.stringify(fixtures), 'EX', 10*60 )

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





