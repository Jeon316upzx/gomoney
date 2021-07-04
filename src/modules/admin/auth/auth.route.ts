import { Router } from "express";
import {register , login }  from './auth.controller'

import { checkIfAdmin } from "../../../middlewares/admin_only";

const Adminrouter = Router();

Adminrouter.post("/register", register);
Adminrouter.post("/login", checkIfAdmin ,  login);


export default Adminrouter;