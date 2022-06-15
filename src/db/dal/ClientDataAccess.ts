import {Op} from 'sequelize'
import Client, { ClientOuput, ClientInput } from '../models/Client'
import { GetAllClientsFilters } from './types/ClientTypes'

export const GetAllClients = async (filters?: GetAllClientsFilters): Promise<ClientOuput[]> => {
    return Client.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}