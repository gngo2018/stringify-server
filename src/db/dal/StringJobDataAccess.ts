import { Op, QueryTypes } from 'sequelize'
import sequelizeConnection from '../config'
import { StringJobDetailDTO } from '../dto/StringJobs/StringJobDetailDTO'
import { StringJobListDTO } from '../dto/StringJobs/StringJobListDTO'
import Client from '../models/Client'
import ClientRacket from '../models/ClientRacket'
import Racket from '../models/Racket'
import StringJob, { StringJobInput, StringJobOutput } from '../models/StringJob'
import { GetAllStringJobsilters } from './types/StringJobTypes'

export const GetAllStringJobsAsync = async (filters?: GetAllStringJobsilters) => {

    const sql = `SELECT s.id AS "stringJobId", s.job_date_time_utc AS "jobDateTimeUtc", c.first_name AS "clientFirstName", 
	cr.serial_number AS "racketSerialNumber", 
	r.brand || ' ' || r.model || ' ' || r.year AS "racketName", c.id AS "clientId" 
    FROM "StringJobs" s 
	LEFT OUTER JOIN "Clients" c ON c.id = s.client_id 
	LEFT OUTER JOIN "ClientRackets" cr ON cr.client_id = c.id 
	LEFT OUTER JOIN "Rackets" r ON r.id = cr.racket_id 
    WHERE s.deleted_at IS null AND c.deleted_at IS null`;


    // const stringJobs = await StringJob.findAll({
    //     where: {
    //         ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
    //     },
    //     ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    // })

    // const query = stringJobs.map(async (sj) => {
    //     let clientRacket: ClientRacket;
    //     let racket: Racket;
    //     const client: Client = await Client.findByPk(sj.clientId);

    //     if (sj.clientRacketId) {
    //         clientRacket = await ClientRacket.findByPk(sj.clientRacketId);
    //         racket = await Racket.findByPk(clientRacket.racketId);
    //     }

    //     const stringJobDto: StringJobListDTO = {
    //         stringJobId: sj.id,
    //         jobDateTimeUtc: sj.jobDateTimeUtc,
    //         clientFirstName: client.firstName,
    //         racketName: clientRacket ? `${racket.brand} ${racket.model} ${racket.year}` : sj.racket,
    //         racketSerialNumber: clientRacket ? clientRacket.serialNumber : '',
    //         clientId: sj.clientId
    //     }

    //     return stringJobDto;
    // })

    // const stringJobListDto = await Promise.all(query);

    const stringJobListDto: StringJobListDTO[] = await sequelizeConnection.query(sql, {
        type: QueryTypes.SELECT,
        mapToModel: true,
    });

    console.log(stringJobListDto);

    return stringJobListDto;
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

export const GetStringJobById = async (id: number): Promise<StringJobDetailDTO> => {
    const stringJob = await StringJob.findByPk(id);
    if (!stringJob) {
        throw new Error('not found')
    }

    let clientRacket: ClientRacket;
    let racket: Racket;
    const client: Client = await Client.findByPk(stringJob.clientId);

    if (stringJob.clientRacketId) {
        clientRacket = await ClientRacket.findByPk(stringJob.clientRacketId);
        racket = await Racket.findByPk(clientRacket.racketId);
    }

    const stringJobDto: StringJobDetailDTO = {
        stringJobId: stringJob.id,
        jobDateTimeUtc: stringJob.jobDateTimeUtc,
        clientId: stringJob.clientId,
        clientRacketId: stringJob.clientRacketId,
        clientFirstName: client.firstName,
        racketName: clientRacket ? `${racket.brand} ${racket.model} ${racket.year}` : stringJob.racket,
        racketSerialNumber: clientRacket ? clientRacket.serialNumber : '',
        stringName: stringJob.stringName,
        stringType: stringJob.stringType,
        tension: stringJob.tension,
        tensionType: stringJob.tensionType,
        chargeAmount: stringJob.chargeAmount,
        notes: stringJob.notes
    }

    return stringJobDto;
}

export const CreateStringJobAsync = async (stringJob: StringJobInput): Promise<StringJobOutput> => {
    const result = await StringJob.create(stringJob)
    return result;
}

export const UpdateStringJobAsync = async (id: number, stringJob: StringJobInput): Promise<StringJobOutput> => {
    const existingStringJob = await StringJob.findByPk(id);
    if (!existingStringJob) {
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
