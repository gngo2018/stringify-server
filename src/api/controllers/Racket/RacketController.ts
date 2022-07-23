import * as RacketService from '../../services/RacketService'
import { RacketInput } from '../../../db/models/Racket'

export const getAll = async () => {
    const Rackets = await RacketService.GetAllRacketsAsync()
    return Rackets;
}

export const getRacketById = async (id: number) => {
    const Racket = await RacketService.GetRacketByIdAsync(id);
    return Racket;
}

export const create = async (payload: RacketInput) => {
    const Racket = await RacketService.CreateRacketAsync(payload);
    return Racket;
}

export const deleteRacketById = async (id: number) => {
    const RacketSuccessfullyDeleted = await RacketService.DeleteRacketByIdAsync(id);
    return RacketSuccessfullyDeleted;
}

export const updateRacket = async (id: number, payload: RacketInput) => {
    const updatedRacket = await RacketService.UpdateRacketAsync(id, payload);
    return updatedRacket;
}