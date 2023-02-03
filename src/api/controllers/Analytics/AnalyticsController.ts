import * as AnalyticsService from '../../services/AnalyticsService'

export const getStringJobAnalyticsData = async () => {
    const result = await AnalyticsService.GetAnalyticsAsync();
    return result;
}