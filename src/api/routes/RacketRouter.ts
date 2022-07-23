import express, { Request, Response } from 'express'
import Racket, { RacketInput, RacketOutput } from '../../db/models/Racket';
import * as RacketController from '../controllers/Racket/RacketController'

export const racketRouter = express.Router();

racketRouter.get("/ping", async (req: Request, res: Response) =>{
    res.status(200).send('Successful Ping!')
})

// GET ALL RacketS
racketRouter.get("/", async (req: Request, res: Response) => {
    try {
        const rackets = await RacketController.getAll();

        res.status(200).send(rackets);
    } catch (e) {
        res.status(500).send(e);
    }
});

//Get Racket By Id
racketRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const racket = await RacketController.getRacketById(id);

        if (racket) {
            return res.status(200).send(racket);
        }

        res.status(404).send("Racket not found");
    } catch (e) {
        res.status(500).send(e);
    }
});

//Update Racket
racketRouter.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const Racket: RacketInput = {
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year
        }

        const result = await RacketController.updateRacket(id, Racket);
        return res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e);
    }
})

//Delete Racket
racketRouter.delete('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const racketSuccessfullyDeleted = await RacketController.deleteRacketById(id);

        if (racketSuccessfullyDeleted) {
            return res.status(204).send(`Racket ${id} successfully deleted`);
        }
    } catch (e) {
        res.status(500).send(e);
    }
})

//Create Racket
racketRouter.post('/', async (req: Request, res: Response) => {
    try {
        const racket: RacketInput = {
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year
        }
        const result = await RacketController.create(racket)
        return res.status(200).send(result)
    }
    catch (e) {
        console.log(e);

        res.status(500).send(e);
    }
})