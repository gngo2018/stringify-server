import * as ClientRacketService from '../../services/ClientRacketService'
import { ClientRacketInput } from '../../../db/models/ClientRacket'

export const getAll = async () => {
    const ClientRackets = await ClientRacketService.GetAllClientRacketsAsync()
    return ClientRackets;
}

export const getClientRacketById = async (id: number) => {
    const ClientRacket = await ClientRacketService.GetClientRacketByIdAsync(id);
    return ClientRacket;
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