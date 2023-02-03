import express, { Request, Response } from 'express'
import { StringJobInput, StringJobOutput } from '../../db/models/StringJob'
import * as StringJobController from '../controllers/StringJob/StringJobController'
import { StringJob } from '../models/StringJob'

export const stringJobRouter = express.Router();

// GET ALL String Jobs
stringJobRouter.get("/", async (req: Request, res: Response) => {
    try {
        const stringJobs = await StringJobController.getAll();

        res.status(200).send(stringJobs);
    } catch (e) {
        res.status(500).send(e);
    }
});

stringJobRouter.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const stringJob = await StringJobController.get(id);
        if (stringJob) {
            return res.status(200).send(stringJob);
        }
        res.status(404).send("String Job not found");
    } catch (e) {
        res.status(500).send(e);
    }
});

//Get String Jobs by ClientId
stringJobRouter.get('/client/:id', async (req: Request, res: Response) => {
    const clientId: number = parseInt(req.params.id, 10);
    try {
        const clientStringJobs: StringJob[] = await StringJobController.getAllByClientId(clientId);

        if (clientStringJobs) {
            return res.status(200).send(clientStringJobs);
        }

        res.status(404).send("String Jobs not found");
    } catch (e) {
        res.status(500).send(e);
    }
});

//Create String Job
stringJobRouter.post('/', async (req: Request, res: Response) => {
    try {
        const stringJob: StringJobInput = {
            jobDateTimeUtc: req.body.jobDateTimeUtc,
            clientId: req.body.clientId,
            clientRacketId: req.body.clientRacketId,
            racket: req.body.racket,
            stringName: req.body.stringName,
            stringType: req.body.stringType,
            tension: req.body.tension,
            tensionType: req.body.tensionType,
            chargeAmount: req.body.chargeAmount,
            notes: req.body.notes
        }
        const result = await StringJobController.create(stringJob)
        return res.status(200).send(result)
    }
    catch (e) {
        console.log(e);

        res.status(500).send(e);
    }
})

//Update String Job
stringJobRouter.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const stringJob: StringJobInput = {
            jobDateTimeUtc: req.body.jobDateTimeUtc,
            clientId: req.body.clientId,
            racket: req.body.racket,
            clientRacketId: req.body.clientRacketId,
            stringName: req.body.stringName,
            stringType: req.body.stringType,
            tension: req.body.tension,
            tensionType: req.body.tensionType,
            chargeAmount: req.body.chargeAmount,
            notes: req.body.notes
        }
        const result = await StringJobController.update(id, stringJob);
        return res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e)
    }
})

//Delete String Job
stringJobRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try{
        const result = await StringJobController.deleteByStringJobId(id);
        return res.status(204).send(result);
    } catch(e) {
        res.status(500).send(e)
    }
});