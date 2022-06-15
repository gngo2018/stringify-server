import express, { Request, Response } from 'express'
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