import * as StringJobService from '../../services/StringJobService'
import { StringJobInput } from '../../../db/models/StringJob'

export const getAll = async () => {
    const stringJobs = await StringJobService.GetAllStringJobsAsync()
    return stringJobs;
}

export const getAllByClientId = async (clientId: number) => {
    const clientStringJobs = await StringJobService.GetAllStringJobsByClientId(clientId);
    return clientStringJobs;
}

export const create = async (payload: StringJobInput) => {
    const stringJob = await StringJobService.CreateStringJobAsync(payload);
    return stringJob;
}
