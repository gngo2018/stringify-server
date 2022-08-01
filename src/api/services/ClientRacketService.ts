import * as ClientRacketDataAccess from '../../db/dal/ClientRacketDataAccess'
import { GetAllClientRacketsFilters } from '../../db/dal/types/ClientRacketTypes'
import ClientRacket, { ClientRacketOutput, ClientRacketInput } from '../../db/models/ClientRacket'


export async function GetAllClientRacketsAsync() {
    const clientRackets = await ClientRacketDataAccess.GetAllClientRacketsAsync();
    return clientRackets
};

export async function GetClientRacketByIdAsync(id: number) {
    const clientRacket = await ClientRacketDataAccess.GetClientRacketByIdAsync(id);
    return clientRacket;
}

export async function GetRacketsByClientId(clientId: number) {
    const rackets = await ClientRacketDataAccess.GetRacketsByClientId(clientId);
    return rackets;
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