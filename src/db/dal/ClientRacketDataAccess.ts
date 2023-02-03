import { Op } from 'sequelize'
import { ClientRacketDetailDTO } from '../dto/ClientRacketDetailDTO'
import Client from '../models/Client'
import ClientRacket, { ClientRacketOutput, ClientRacketInput } from '../models/ClientRacket'
import Racket from '../models/Racket'
import { GetAllClientRacketsFilters } from './types/ClientRacketTypes'

export const GetAllClientRacketsAsync = async (filters?: GetAllClientRacketsFilters) => {
    const clientRackets = await ClientRacket.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })

    const query = clientRackets.map(async (cr) => {
        const racket = await Racket.findByPk(cr.racketId);
        const client = await Client.findByPk(cr.clientId);

        const clientRacketDetailDto: ClientRacketDetailDTO = {
            clientRacketId: cr.id,
            serialNumber: cr.serialNumber,
            clientId: cr.clientId,
            clientFirstName: client.firstName,
            clientLastName: client.lastName,
            racketId: cr.racketId,
            racketBrand: racket.brand,
            racketModel: racket.model,
            racketYear: racket.year
        }

        return clientRacketDetailDto;
    })

    const clientRacketDetailDTO = await Promise.all(query);

    return clientRacketDetailDTO;
}

export const GetClientRacketByIdAsync = async (id: number): Promise<ClientRacketOutput> => {
    const clientRacket = await ClientRacket.findByPk(id)
    if (!clientRacket) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return clientRacket;
}

export const GetRacketsByClientId = async (clientId: number) => {
    const clientRackets = await ClientRacket.findAll({
        where: {
            clientId: clientId,
            deletedAt: null
        }
    })
    const query = clientRackets.map(async (cr) => {
        const racket = await Racket.findByPk(cr.racketId);
        const client = await Client.findByPk(cr.clientId);

        const clientRacketDetailDto: ClientRacketDetailDTO = {
            clientRacketId: cr.id,
            serialNumber: cr.serialNumber,
            clientId: cr.clientId,
            clientFirstName: client.firstName,
            clientLastName: client.lastName,
            racketId: cr.racketId,
            racketBrand: racket.brand,
            racketModel: racket.model,
            racketYear: racket.year
        }

        return clientRacketDetailDto;
    })

    const clientRacketDetailDTO = await Promise.all(query);

    return clientRacketDetailDTO;
}

export const CreateClientRacketAsync = async (clientRacket: ClientRacketInput): Promise<ClientRacketOutput> => {
    const result = await ClientRacket.create(clientRacket)
    return result;
}

export const DeleteClientRacketByIdAsync = async (id: number): Promise<boolean> => {
    const deletedClientRacket = await ClientRacket.destroy({
        where: { id }
    })
    return !!deletedClientRacket
}

export const UpdateClientRacketAsync = async (id: number, payload: Partial<ClientRacketInput>): Promise<ClientRacketOutput> => {
    const clientRacket = await ClientRacket.findByPk(id)
    if (!clientRacket) {
        throw new Error('not found')
    }
    const updatedClientRacket = await (clientRacket).update(payload)
    console.log(updatedClientRacket);

    return updatedClientRacket;
}