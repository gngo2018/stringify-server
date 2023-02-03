import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import { clientRouter } from './api/routes/ClientRouter'
import { errorHandler } from './api/middlewares/ErrorMiddleware'
import { notFoundHandler } from './api/middlewares/NotFoundMiddleware'
import { stringJobRouter } from './api/routes/StringJobRouter'
import { racketRouter } from './api/routes/RacketRouter'
import { clientRacketRouter } from './api/routes/ClientRacketRouter'
import { analyticsRouter } from './api/routes/AnalyticsRouter'

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:3001', 
  'https://stringify-client.vercel.app',
  'https://stringify-client-git-main-gngo2018.vercel.app',
  'https://stringify-client-gngo2018.vercel.app',
  'https://stringify.vercel.app'
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
};

app.use(cors(options));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api/clients", clientRouter);
app.use("/api/stringjobs", stringJobRouter)
app.use("/api/rackets", racketRouter)
app.use("/api/clientrackets", clientRacketRouter)
app.use("/api/analytics", analyticsRouter)
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});