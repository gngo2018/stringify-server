import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import { clientRouter } from './api/routes/ClientRouter'
import { errorHandler } from './api/middlewares/ErrorMiddleware'
import { notFoundHandler } from './api/middlewares/NotFoundMiddleware'
import { stringJobRouter } from './api/routes/StringJobRouter'

const app = express();
const port = 3000;

const allowedOrigins = ['http://localhost:3001', 'https://hermes-app-blush.vercel.app'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api/clients", clientRouter);
app.use("/api/stringjobs", stringJobRouter)
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});