import express, { Request, Response } from 'express'
import ClientRacket, { ClientRacketInput, ClientRacketOutput } from '../../db/models/ClientRacket';
import * as ClientRacketController from '../controllers/ClientRacket/ClientRacketController'

export const clientRacketRouter = express.Router();

clientRacketRouter.get("/ping", async (req: Request, res: Response) =>{
    res.status(200).send('Successful Ping!')
})

// GET ALL ClientRackets
clientRacketRouter.get("/", async (req: Request, res: Response) => {
    try {
        const ClientRackets = await ClientRacketController.getAll();

        res.status(200).send(ClientRackets);
    } catch (e) {
        res.status(500).send(e);
    }
});

//Get ClientRacket By Id
clientRacketRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const ClientRacket = await ClientRacketController.getClientRacketById(id);

        if (ClientRacket) {
            return res.status(200).send(ClientRacket);
        }

        res.status(404).send("ClientRacket not found");
    } catch (e) {
        res.status(500).send(e);
    }
});

//Get ClientRacket By Id
clientRacketRouter.get('/client/:id', async (req: Request, res: Response) => {
    const clientId: number = parseInt(req.params.id, 10);
    try {
        const rackets = await ClientRacketController.getRacketsByClientId(clientId);

        if (rackets) {
            return res.status(200).send(rackets);
        }
        res.status(404).send("Rackets not found");
    } catch (e) {
        res.status(500).send(e);
    }
});

//Update ClientRacket
clientRacketRouter.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const clientRacket: ClientRacketInput = {
            serialNumber: req.body.serialNumber,
            clientId: req.body.clientId,
            racketId: req.body.racketId
        }
        const result = await ClientRacketController.updateClientRacket(id, clientRacket);
        return res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e);
    }
})

//Delete ClientRacket
clientRacketRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const clientRacketSuccessfullyDeleted = await ClientRacketController.deleteClientRacketById(id);

        if (clientRacketSuccessfullyDeleted) {
            return res.status(204).send(`ClientRacket ${id} successfully deleted`);
        }
    } catch (e) {
        res.status(500).send(e);
    }
})

//Create ClientRacket
clientRacketRouter.post('/', async (req: Request, res: Response) => {
    try {
        const clientRacket: ClientRacketInput = {
            serialNumber: req.body.serialNumber,
            clientId: req.body.clientId,
            racketId: req.body.racketId
        }
        const result = await ClientRacketController.create(clientRacket)
        return res.status(200).send(result)
    }
    catch (e) {
        res.status(500).send(e);
    }
})