import { GetStaticClients } from '../models/Client'
import * as ClientDataAccess from '../../db/dal/ClientDataAccess'
import { GetAllClientsFilters } from '../../db/dal/types/ClientTypes'
import Client, { ClientOuput, ClientInput } from '../../db/models/Client'


export async function GetAllClients() {
    const clients = await ClientDataAccess.GetAllClients();

    return clients
};