import * as ClientRacketService from '../../services/ClientRacketService'
import { ClientRacketInput } from '../../../db/models/ClientRacket'

export const getAll = async () => {
    const clientRackets = await ClientRacketService.GetAllClientRacketsAsync()
    return clientRackets;
}

export const getClientRacketById = async (id: number) => {
    const clientRacket = await ClientRacketService.GetClientRacketByIdAsync(id);
    return clientRacket;
}

export const getRacketsByClientId = async (clientId: number) => {
    const rackets = await ClientRacketService.GetRacketsByClientId(clientId);
    return rackets;
}

export const create = async (payload: ClientRacketInput) => {
    const ClientRacket = await ClientRacketService.CreateClientRacketAsync(payload);
    return ClientRacket;
}

export const deleteClientRacketById = async (id: number) => {
    const ClientRacketSuccessfullyDeleted = await ClientRacketService.DeleteClientRacketByIdAsync(id);
    return ClientRacketSuccessfullyDeleted;
}

export const updateClientRacket = async (id: number, payload: ClientRacketInput) => {
    const updatedClientRacket = await ClientRacketService.UpdateClientRacketAsync(id, payload);
    return updatedClientRacket;
}