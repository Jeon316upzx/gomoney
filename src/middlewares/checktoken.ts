import jwt from 'jsonwebtoken'
import config_options from '../config/options';
import { Request , Response , NextFunction } from 'express'
import { HTTP } from '../constants/statuscode'
import { rResponse } from '../constants/response'



//checktoken middleware verifies the token from requests
export const checktoken = (req:Request, res:Response, next:NextFunction) => {

  try {
    let token:any= '';
    if(req.headers.authorization){
        token = req.headers.authorization.split(' ')[1]
    }
    console.log(req.params)
    const decodedToken:any = jwt.verify(token, config_options.JWT_TOKEN_KEY);
    
    const userId = decodedToken.userId;

    //extract made by ie who made the request
    req.body.made_by = decodedToken._id

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(HTTP.UNAUTHORIZED).send({
      data: null,
      message: 'Invalid request',
      status: rResponse.ERROR
    })
  }
};