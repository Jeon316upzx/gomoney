import userModel from '../models/User.model';
import { Request , Response , NextFunction } from 'express'
import { HTTP } from '../constants/statuscode'
import { rResponse } from '../constants/response'


//Checks if user has admin privileges 
export const checkIfAdmin = async (req:Request, res:Response, next:NextFunction) => {

  const { email } = req.body

  try {

    const user:any =  await userModel.findOne({ email: email })
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