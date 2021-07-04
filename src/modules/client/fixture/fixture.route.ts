import { Router } from "express";

import { viewPendingFixtures , viewCompletedFixtures} from "./fixture.controller";
import { checktoken } from "../../../middlewares/checktoken";

const ClientFixturesrouter = Router();

ClientFixturesrouter.get("/pending", checktoken, viewPendingFixtures);

ClientFixturesrouter.get("/completed", checktoken, viewCompletedFixtures);


export default ClientFixturesrouter;