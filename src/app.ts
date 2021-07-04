import express, { Application, Request, Response, NextFunction } from "express"
import routes from './modules/namespace.routes'
import config_options from "./config/options"

//Initialize database
import db from './config/database'
db


//Initialize Express App
const app: Application = express()


//Initialize Express Body Parser and Dev logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiURL = `/gomoney/api/${config_options.API_VERSION}`;

//Home route
app.get('/', (req: Request, res: Response) => {
    return res.send('Gomoney mock premier league test');
  });

app.use(apiURL, routes());

export default app;