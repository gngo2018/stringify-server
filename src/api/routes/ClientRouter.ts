import express, { Request, Response } from 'express'
import { ClientInput, ClientOutput } from '../../db/models/Client';
import * as ClientController from '../controllers/Client/ClientController'
import { Client } from '../models/Client'

export const clientRouter = express.Router();

// GET ALL CLIENTS
clientRouter.get("/", async (req: Request, res: Response) => {
    try {
        const clients: Client[] = await ClientController.getAll();

        res.status(200).send(clients);
    } catch (e) {
        res.status(500).send(e);
    }
});

//Update Client
clientRouter.put('/:id', () => {
    // update ingredient
})

//Delete Client
clientRouter.delete('/:id', () => {
    // delete ingredient
})

//Create Client
clientRouter.post('/', async (req: Request, res: Response) => {
    try {
        const client: ClientInput = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            racket: req.body.racket,
        }
        const result = await ClientController.create(client)
        return res.status(200).send(result)
    }
    catch(e) {
        console.log(e);
        
        res.status(500).send(e);
    }
})