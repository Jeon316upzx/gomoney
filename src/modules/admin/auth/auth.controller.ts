import userModel from "../../../models/User.model";
import bcrypt from 'bcryptjs';
import config_options from "../../../config/options";
import { Request , Response } from 'express';
import { HTTP } from "../../../constants/statuscode";
import {rResponse}  from "../../../constants/response";
import { registrationSchema , loginSchema } from "../../client/auth/auth.validator"
import jwt from 'jsonwebtoken'



export const register = async (req: Request, res: Response ) => {

    const { 
            firstname , 
            lastname , 
            email,
            password } = req.body;


        const result = registrationSchema.validate(req.body); 
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




    const userexists = await userModel.findOne({ email  });

    if(userexists){
        return res
        .status(HTTP.CONFLICT)
        .send({
            data: null,
            message: "Admin already exists",
            status: rResponse.ERROR
        })
    }

    const newuser = new userModel({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    })

    newuser.save().then((result:any) =>{
        return res
        .status(HTTP.CREATED)
        .send({
            data: null,
            message: "Account created Successfully",
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
    
  };


export const login = async (req: Request, res: Response ) => {

        const { email, password } = req.body;
    
            const result = loginSchema.validate(req.body); 
            const { value, error } = result; 
            const valid = error == null; 
    
            if (!valid) { 
                res.status(HTTP.MISSING_PARAMS).json({ 
                message: 'Oops! Some required fields are missing', 
                data: req.body 
                }) 
            }
    
    
        const user = await userModel.findOne({ email });
    
        if (!user) {
          return res.status(HTTP.BAD_REQUEST).send({
            data: null,
            message: "Account with this email address does not exist.",
            status: rResponse.ERROR
          });
        }
      
      
        const Isvalidpass = await bcrypt.compare(password, user.password);
        if (!Isvalidpass) {
          return res.status(HTTP.BAD_REQUEST).send({
            data:null,
            message: "Password is incorrect",
            status: rResponse.ERROR
          });
        }
      
        const token = jwt.sign(
          { _id: user._id },
          config_options.JWT_TOKEN_KEY
        );
    
        return res.status(200).send({
          data:{
              token: token,
              user: user
          },
          message: "Login successful",
          status: rResponse.SUCCESS
        });
    
        
        
      };






