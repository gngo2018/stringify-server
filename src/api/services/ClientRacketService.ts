import * as ClientRacketDataAccess from '../../db/dal/ClientRacketDataAccess'
import { GetAllClientRacketsFilters } from '../../db/dal/types/ClientRacketTypes'
import ClientRacket, { ClientRacketOutput, ClientRacketInput } from '../../db/models/ClientRacket'


export async function GetAllClientRacketsAsync() {
    const ClientRackets = await ClientRacketDataAccess.GetAllClientRacketsAsync();
    return ClientRackets
};

export async function GetClientRacketByIdAsync(id: number) {
    const ClientRacket = await ClientRacketDataAccess.GetClientRacketByIdAsync(id);
    return ClientRacket;
}

export async function CreateClientRacketAsync(ClientRacket: ClientRacketInput) {
    const result = await ClientRacketDataAccess.CreateClientRacketAsync(ClientRacket)
    return result;
}

export async function DeleteClientRacketByIdAsync(id: number) {
    const result = await ClientRacketDataAccess.DeleteClientRacketByIdAsync(id);
    return result;
}

export async function UpdateClientRacketAsync(id: number, payload: ClientRacketInput) {
    const result = await ClientRacketDataAccess.UpdateClientRacketAsync(id, payload);
    return result;
}