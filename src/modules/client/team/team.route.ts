import { Router } from "express";


import { viewTeam , viewTeams , searchTeams } from "./team.controller";
import { checktoken } from "../../../middlewares/checktoken";

const ClientTeamsrouter = Router();



ClientTeamsrouter.get("/view/:id", checktoken, viewTeam);

ClientTeamsrouter.get("/view", checktoken, viewTeams );

ClientTeamsrouter.get("/search", searchTeams );



export default ClientTeamsrouter;