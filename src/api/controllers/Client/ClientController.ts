import * as ClientService from '../../services/ClientService'
// import {CreateIngredientDTO, UpdateIngredientDTO, FilterIngredientsDTO} from '../../dto/ingredient.dto'
import { Client } from '../../models/Client'
import * as mapper from './ClientMapper'
import { ClientInput } from '../../../db/models/Client'

export const getAll = async () => {
    const clients = await ClientService.GetAllClientsAsync()
    return clients;
}

export const getClientById = async (id: number) => {
    const client = await ClientService.GetClientByIdAsync(id);
    return client;
}

export const create = async (payload: ClientInput) => {
    const client = await ClientService.CreateClientAsync(payload);
    return client;
}