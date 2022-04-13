import  express from 'express';
import Configuration from "./configurations/configuration.js";
import Middlewares from './middlewares/Middlewares.js'
import AliveRoutes from "./routes/AliveRoutes.js";
import UserRoutes from "./routes/TodoRoutes.js";

//Initiate ExpressAPP
const app = express()
Middlewares.apply(app)

AliveRoutes.routes(app)
UserRoutes.routes(app)

Middlewares.wrongPath(app)
Middlewares.errorHandling(app)

// Start Server
Configuration.connectToPort(app)

export default app