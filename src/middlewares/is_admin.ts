import userModel from '../models/User.model';
import { Request , Response , NextFunction } from 'express'
import { HTTP } from '../constants/statuscode'
import { rResponse } from '../constants/response'



//checks if a request was made by an admin
export const is_admin = async (req:Request, res:Response, next:NextFunction) => {

  const { made_by } = req.body

  try {

    const user:any =  await userModel.findOne({ _id: made_by })

    //checks if the usertype is admin
    if (user.usertype !== "admin"){
         return res.status(HTTP.UNAUTHORIZED).send({
            data: null,
            message: 'Unauthorized Access',
            status: rResponse.ERROR

          })
    }else{
      next()
    }

  } catch {
    res.status(HTTP.UNAUTHORIZED).send({
      data:null,
      message: 'Invalid request',
      status: rResponse.ERROR
    })
  }
};