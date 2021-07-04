import { Router } from "express";
import {register , login }  from './auth.controller'

const Authrouter = Router();

Authrouter.post("/register", register);
Authrouter.post("/login", login);


export default Authrouter;