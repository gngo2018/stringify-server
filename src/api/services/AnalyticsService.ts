import * as AnalyticsDataAccess from '../../db/dal/AnalyticsDataAccess'

export async function GetAnalyticsAsync(){
    const result = await AnalyticsDataAccess.AnalyticsAsync();
    return result;
}
