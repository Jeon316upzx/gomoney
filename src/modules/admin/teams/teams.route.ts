import { Router } from "express";


import { addTeam, removeTeam , editTeam , viewTeam , viewTeams } from "./teams.controller";
import { is_admin } from "../../../middlewares/is_admin";
import { checktoken } from "../../../middlewares/checktoken";

const Teamsrouter = Router();

Teamsrouter.post("/add", checktoken, is_admin, addTeam);

Teamsrouter.post("/edit/:id", checktoken, is_admin, editTeam);

Teamsrouter.post("/remove/:id", checktoken, is_admin, removeTeam);

Teamsrouter.get("/view/:id", checktoken, is_admin, viewTeam);

Teamsrouter.get("/view", checktoken, is_admin, viewTeams );



export default Teamsrouter;