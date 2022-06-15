import * as ClientService from '../../services/ClientService'
// import {CreateIngredientDTO, UpdateIngredientDTO, FilterIngredientsDTO} from '../../dto/ingredient.dto'
import { Client } from '../../models/Client'
import * as mapper from './ClientMapper'

export const getAll = async () => {
    const clients = await ClientService.GetAllClients()

    return clients;
}