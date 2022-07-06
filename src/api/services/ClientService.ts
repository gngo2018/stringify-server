import { GetStaticClients } from '../models/Client'
import * as ClientDataAccess from '../../db/dal/ClientDataAccess'
import { GetAllClientsFilters } from '../../db/dal/types/ClientTypes'
import Client, { ClientOutput, ClientInput } from '../../db/models/Client'


export async function GetAllClientsAsync() {
    const clients = await ClientDataAccess.GetAllClientsAsync();
    return clients
};

export async function GetClientByIdAsync(id: number) {
    const client = await ClientDataAccess.GetClientByIdAsync(id);
    return client;
}

export async function CreateClientAsync(client: ClientInput) {
    const result = await ClientDataAccess.CreateClientAsync(client)
    return result;
}

export async function DeleteClientByIdAsync(id: number) {
    const result = await ClientDataAccess.DeleteClientByIdAsync(id);
    return result;
}

export async function UpdateClientAsync(id: number, payload: ClientInput) {
    const result = await ClientDataAccess.UpdateClientAsync(id, payload);
    return result;
}