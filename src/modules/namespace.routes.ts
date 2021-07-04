import { Router } from "express";

import Authrouter from "./client/auth/auth.route";
import Teamsrouter from "./admin/teams/teams.route";
import Adminrouter from "./admin/auth/auth.route";
import Fixturesrouter from "./admin/fixture/fixture.route";
import ClientTeamsrouter from "./client/team/team.route";
import ClientFixturesrouter from "./client/fixture/fixture.route";
import { limiter } from "../middlewares/rate_limiter";


export default function routes() {

  const router = Router();

  //CLIENT
  //Client Authentication Router Namespace
  router.use("/auth", limiter, Authrouter);

  // Client Teams Router Namespace
  router.use("/teams", limiter , ClientTeamsrouter);

   // Client Fixtures Router Namespace
   router.use("/fixtures", limiter , ClientFixturesrouter);



  //ADMIN
  //Admin Authentication Router Namespace
  router.use("/admin", Adminrouter);

  //Teams Router Namespace
  router.use("/admin/team", Teamsrouter);

   //Fixtures Router Namespace
   router.use("/admin/fixture", Fixturesrouter);

  return router;
}
