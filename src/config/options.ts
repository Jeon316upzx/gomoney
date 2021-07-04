import  * as dotenv from 'dotenv'

dotenv.config()



//Project configuration oprions
const PORT = process.env.PORT || 3000
const MONGO_URL:any = process.env.MONGO_URL
const API_VERSION:any = process.env.API_VERSION
const JWT_TOKEN_KEY:any = process.env.JWT_TOKEN_KEY
const REDIS_PORT:any = process.env.REDIS_PORT || 6379
const REDIS_HOST:any = process.env.REDIS_HOST 



//MongoDB configuration options
const MONGODB_OPTIONS = {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    keepAlive: true,
    poolSize:50,
    autoIndex:false,
    retryWrites:false
    
}


const config_options = {
    PORT : PORT,
    MONGO_URL: MONGO_URL,
    MONGODB_OPTIONS: MONGODB_OPTIONS,
    API_VERSION: API_VERSION,
    JWT_TOKEN_KEY: JWT_TOKEN_KEY,
    REDIS_PORT: REDIS_PORT,
    REDIS_HOST: REDIS_HOST
}

export default config_options;