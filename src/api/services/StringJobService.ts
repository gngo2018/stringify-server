import * as StringJobDataAccess from '../../db/dal/StringJobDataAccess'
import { StringJobInput } from '../../db/models/StringJob'

export async function GetAllStringJobsAsync() {
    const stringJobs = await StringJobDataAccess.GetAllStringJobsAsync();
    return stringJobs
};

export async function GetAllStringJobsByClientId(clientId: number) {
    const clientStringJobs = await StringJobDataAccess.GetStringJobsByClientId(clientId);
    return clientStringJobs;
}

export async function GetStringJobById(id: number) {
    const stringJob = await StringJobDataAccess.GetStringJobById(id);
    return stringJob;
}

export async function CreateStringJobAsync(stringJob: StringJobInput) {
    const result = await StringJobDataAccess.CreateStringJobAsync(stringJob)
    return result;
}

export async function UpdateStringJobAsync(id: number, payload: StringJobInput) {
    const result = await StringJobDataAccess.UpdateStringJobAsync(id, payload);
    return result;
}

export async function DeleteStringJobAsync(id: number){
    const result = await StringJobDataAccess.DeleteStringJobAsync(id);
    return result;
}
