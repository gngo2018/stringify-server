import {Op} from 'sequelize'
import StringJob, { StringJobInput, StringJobOutput } from '../models/StringJob'
import { GetAllStringJobsilters } from './types/StringJobTypes'

export const GetAllStringJobsAsync = async (filters?: GetAllStringJobsilters): Promise<StringJobOutput[]> => {
    return StringJob.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

export const GetStringJobsByClientId = async (clientId: number): Promise<StringJobOutput[]> => {
    const clientStringJobs = await StringJob.findAll({
        where: {
            clientId: clientId
        }
    })
    if (!clientStringJobs) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return clientStringJobs;
}

export const GetStringJobById = async (id: number): Promise<StringJobOutput> => {
    const stringJob = await StringJob.findByPk(id);
    if(!stringJob){
        throw new Error('not found')
    }
    return stringJob;
}

export const CreateStringJobAsync = async (stringJob: StringJobInput): Promise<StringJobOutput> => {
    const result = await StringJob.create(stringJob)
    return result;
}

export const UpdateStringJobAsync = async (id:number, stringJob: StringJobInput): Promise<StringJobOutput> => {
    const existingStringJob = await StringJob.findByPk(id);
    if(!existingStringJob){
        throw new Error('not found')
    }
    const result = await (existingStringJob as StringJob).update(stringJob);
    return result;
}

export const DeleteStringJobAsync = async (id: number): Promise<boolean> => {
    const deletedStringJob = await StringJob.destroy({
        where: {
            id: id
        }
    })

    return !!deletedStringJob;
}
