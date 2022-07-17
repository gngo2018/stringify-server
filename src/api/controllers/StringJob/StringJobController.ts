import * as StringJobService from '../../services/StringJobService'
import { StringJobInput } from '../../../db/models/StringJob'

export const getAll = async () => {
    const stringJobs = await StringJobService.GetAllStringJobsAsync()
    return stringJobs;
}

export const get = async(id: number) => {
    const stringJob = await StringJobService.GetStringJobById(id);
    return stringJob;
}

export const getAllByClientId = async (clientId: number) => {
    const clientStringJobs = await StringJobService.GetAllStringJobsByClientId(clientId);
    return clientStringJobs;
}

export const create = async (payload: StringJobInput) => {
    const stringJob = await StringJobService.CreateStringJobAsync(payload);
    return stringJob;
}

export const update = async (id: number, payload: StringJobInput) => {
    const stringJob = await StringJobService.UpdateStringJobAsync(id, payload);
    return stringJob;
}

export const deleteByStringJobId = async (id: number) => {
    const result = await StringJobService.DeleteStringJobAsync(id);
    return result;
}