import { QueryTypes } from 'sequelize'
import sequelizeConnection from '../config'
import { AnalyticsDataDTO } from '../dto/StringJobs/AnalyticsDataDTO';

export const AnalyticsAsync = async() => {
    const analyticsSql = `SELECT r.brand, s.charge_amount as "chargeAmount", s.job_date_time_utc as "jobDateTime"
    FROM "StringJobs" s
    LEFT OUTER JOIN "ClientRackets" cr ON cr.id = s.client_racket_Id
    LEFT OUTER JOIN "Rackets" r ON r.id = cr.racket_id
    `
    const analyticsData: AnalyticsDataDTO[] = await sequelizeConnection.query(analyticsSql, {
        type: QueryTypes.SELECT
    });

    return analyticsData;
}
