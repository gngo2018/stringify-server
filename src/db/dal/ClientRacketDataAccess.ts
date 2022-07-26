import { Op } from 'sequelize'
import ClientRacket, { ClientRacketOutput, ClientRacketInput } from '../models/ClientRacket'
import { GetAllClientRacketsFilters } from './types/ClientRacketTypes'

export const GetAllClientRacketsAsync = async (filters?: GetAllClientRacketsFilters): Promise<ClientRacketOutput[]> => {
    return ClientRacket.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })
}

export const GetClientRacketByIdAsync = async (id: number): Promise<ClientRacketOutput> => {
    const clientRacket = await ClientRacket.findByPk(id)
    if (!clientRacket) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return clientRacket;
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
    // console.log(clientRacket as ClientRacket);
    console.log(payload);


    if (!clientRacket) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedClientRacket = await (clientRacket).update(payload)
    console.log(updatedClientRacket);

    return updatedClientRacket;
}