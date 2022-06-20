import {Op} from 'sequelize'
import Client, { ClientOutput, ClientInput } from '../models/Client'
import { GetAllClientsFilters } from './types/ClientTypes'

export const GetAllClientsAsync = async (filters?: GetAllClientsFilters): Promise<ClientOutput[]> => {
    return Client.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

export const GetClientByIdAsync = async (id: number): Promise<ClientOutput> => {
    const client = await Client.findByPk(id)
    if (!client) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return client;
}

export const CreateClientAsync = async (client: ClientInput): Promise<ClientOutput> => {
    const result = await Client.create(client)
    return result;
}

export const DeleteClientByIdAsync = async (id: number): Promise<boolean> => {
    const deletedClient = await Client.destroy({
        where: {id}
    })
    return !!deletedClient
}

export const UpdateClientAsync = async (id: number, payload: Partial<ClientInput>): Promise<ClientOutput> => {
    const client = await Client.findByPk(id)
    if (!client) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedClient = await (client as Client).update(payload)
    return updatedClient;
}