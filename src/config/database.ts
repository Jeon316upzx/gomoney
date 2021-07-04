import mongoose from 'mongoose'
import config_options from './options'
import logger from '../logger';



//Database configuration 
const db:any = mongoose.connect(config_options.MONGO_URL, config_options.MONGODB_OPTIONS).then(()=>{
    logger.info(`Database Connected 🚀`)
}).catch((error)=>{
    logger.error(`${error} 😱`)
});


export default db;