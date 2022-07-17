import * as StringJobDataAccess from '../../db/dal/StringJobDataAccess'
import { GetAllStringJobsilters } from '../../db/dal/types/StringJobTypes'
import StringJob, { StringJobOutput, StringJobInput } from '../../db/models/StringJob'

export async function GetAllStringJobsAsync() {
    const stringJobs = await StringJobDataAccess.GetAllStringJobsAsync();
    return stringJobs
};

export async function GetAllStringJobsByClientId(clientId: number) {
    const clientStringJobs = await StringJobDataAccess.GetStringJobsByClientId(clientId);
    return clientStringJobs;
}

export async function GetStringJobById(id: number){
    const stringJob = await StringJobDataAccess.GetStringJobById(id);
    return stringJob;
}

export async function CreateStringJobAsync(stringJob: StringJobInput) {
    const result = await StringJobDataAccess.CreateStringJobAsync(stringJob)
    return result;
}
