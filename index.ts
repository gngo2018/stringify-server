import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clientRouter } from './src/api/routes/ClientRouter'
import { errorHandler } from './src/api/middlewares/ErrorMiddleware'
import { notFoundHandler } from './src/api/middlewares/NotFoundMiddleware'

const app = express();
const port = 3000;

app.use(cors());
app.use("/api/clients", clientRouter);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});