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

export const deleteClientById = async (id: number) => {
    const clientSuccessfullyDeleted = await ClientService.DeleteClientByIdAsync(id);
    return clientSuccessfullyDeleted;
}

export const updateClient = async (id: number, payload: ClientInput) => {
    const updatedClient = await ClientService.UpdateClientAsync(id, payload);
    return updatedClient;
}