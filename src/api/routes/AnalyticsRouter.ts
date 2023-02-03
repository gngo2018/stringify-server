import express, { Request, Response } from 'express'
import * as AnalyticsController from '../controllers/Analytics/AnalyticsController'

export const analyticsRouter = express.Router();

//Get String Job Analytics Data
analyticsRouter.get('/', async (req: Request, res: Response) => {
    try{
        const result = await AnalyticsController.getStringJobAnalyticsData();
        return res.status(200).send(result);
    } catch(e){
        res.status(500).send(e);
    }
})