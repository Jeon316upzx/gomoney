import config from './config/options'
import logger from "./logger"
import app from './app'



const PORT = config.PORT || 3000


app.listen(PORT, () => {
  logger.info(`server is running on PORT ${PORT}`)
})