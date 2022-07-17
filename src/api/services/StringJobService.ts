import * as StringJobDataAccess from '../../db/dal/StringJobDataAccess'
import { GetAllStringJobsilters } from '../../db/dal/types/StringJobTypes'
import StringJob, { StringJobOutput, StringJobInput } from '../../db/models/StringJob'

export async function GetAllStringJobsAsync() {
    const stringJobs = await StringJobDataAccess.GetAllStringJobsAsync();
    return stringJobs
};

export async function CreateStringJobAsync(stringJob: StringJobInput) {
    const result = await StringJobDataAccess.CreateStringJobAsync(stringJob)
    return result;
}
