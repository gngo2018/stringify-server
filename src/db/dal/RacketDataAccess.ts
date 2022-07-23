import {Op} from 'sequelize'
import Racket, { RacketOutput, RacketInput } from '../models/Racket'
import { GetAllRacketsFilters } from './types/RacketTypes'

export const GetAllRacketsAsync = async (filters?: GetAllRacketsFilters): Promise<RacketOutput[]> => {
    return Racket.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

export const GetRacketByIdAsync = async (id: number): Promise<RacketOutput> => {
    const racket = await Racket.findByPk(id)
    if (!racket) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return racket;
}

export const CreateRacketAsync = async (racket: RacketInput): Promise<RacketOutput> => {
    const result = await Racket.create(racket)
    return result;
}

export const DeleteRacketByIdAsync = async (id: number): Promise<boolean> => {
    const deletedRacket = await Racket.destroy({
        where: {id}
    })
    return !!deletedRacket
}

export const UpdateRacketAsync = async (id: number, payload: Partial<RacketInput>): Promise<RacketOutput> => {
    const racket = await Racket.findByPk(id)
    if (!Racket) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedRacket = await (racket as Racket).update(payload)
    return updatedRacket;
}