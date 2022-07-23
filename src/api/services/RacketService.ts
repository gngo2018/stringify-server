import * as RacketDataAccess from '../../db/dal/RacketDataAccess'
import { GetAllRacketsFilters } from '../../db/dal/types/RacketTypes'
import Racket, { RacketOutput, RacketInput } from '../../db/models/Racket'


export async function GetAllRacketsAsync() {
    const Rackets = await RacketDataAccess.GetAllRacketsAsync();
    return Rackets
};

export async function GetRacketByIdAsync(id: number) {
    const Racket = await RacketDataAccess.GetRacketByIdAsync(id);
    return Racket;
}

export async function CreateRacketAsync(racket: RacketInput) {
    const result = await RacketDataAccess.CreateRacketAsync(racket)
    return result;
}

export async function DeleteRacketByIdAsync(id: number) {
    const result = await RacketDataAccess.DeleteRacketByIdAsync(id);
    return result;
}

export async function UpdateRacketAsync(id: number, payload: RacketInput) {
    const result = await RacketDataAccess.UpdateRacketAsync(id, payload);
    return result;
}