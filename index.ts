import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import { clientRouter } from './src/api/routes/ClientRouter'
import { errorHandler } from './src/api/middlewares/ErrorMiddleware'
import { notFoundHandler } from './src/api/middlewares/NotFoundMiddleware'
import { stringJobRouter } from './src/api/routes/StringJobRouter'

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api/clients", clientRouter);
app.use("/api/stringjobs", stringJobRouter)
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});