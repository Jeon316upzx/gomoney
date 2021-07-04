import { Router } from "express";


import { addFixture , 
         removeFixture , 
         editFixture , 
         viewFixture , 
         viewFixtures ,
         generateFixtureLink } from "./fixture.controller";
import { is_admin } from "../../../middlewares/is_admin";
import { checktoken } from "../../../middlewares/checktoken";

const Fixturesrouter = Router();

Fixturesrouter.post("/add", checktoken, is_admin, addFixture);

Fixturesrouter.post("/edit/:id", checktoken, is_admin, editFixture);

Fixturesrouter.post("/remove/:id", checktoken, is_admin, removeFixture);

Fixturesrouter.get("/view/:id", checktoken, is_admin, viewFixture);

Fixturesrouter.get("/view", checktoken, is_admin, viewFixtures );

Fixturesrouter.post("/generate-link/:id", checktoken, is_admin, generateFixtureLink );



export default Fixturesrouter;