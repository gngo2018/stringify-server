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

//Get Client By Id
clientRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const client: Client = await ClientController.getClientById(id);

        if (client) {
            return res.status(200).send(client);
        }

        res.status(404).send("Client not found");
    } catch (e) {
        res.status(500).send(e);
    }
});

//Update Client
clientRouter.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const client: ClientInput = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            racket: req.body.racket
        }

        const result = await ClientController.updateClient(id, client);
        return res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e);
    }
})

//Delete Client
clientRouter.delete('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const clientSuccessfullyDeleted = await ClientController.deleteClientById(id);

        if (clientSuccessfullyDeleted) {
            return res.status(204).send(`Client ${id} successfully deleted`);
        }
    } catch (e) {
        res.status(500).send(e);
    }
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
    catch (e) {
        console.log(e);

        res.status(500).send(e);
    }
})