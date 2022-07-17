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

export const CreateStringJobAsync = async (stringJob: StringJobInput): Promise<StringJobOutput> => {
    const result = await StringJob.create(stringJob)
    return result;
}
