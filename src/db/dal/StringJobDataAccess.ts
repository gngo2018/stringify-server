import { FindOptions, IncrementDecrementOptionsWithBy, InstanceDestroyOptions, InstanceRestoreOptions, InstanceUpdateOptions, Model, QueryTypes, SaveOptions, SetOptions } from 'sequelize'
import { SequelizeHooks } from 'sequelize/types/hooks'
import { ValidationOptions } from 'sequelize/types/instance-validator'
import { Fn, Col, Literal } from 'sequelize/types/utils'
import sequelizeConnection from '../config'
import { StringJobDetailDTO } from '../dto/StringJobs/StringJobDetailDTO'
import { StringJobListDTO } from '../dto/StringJobs/StringJobListDTO'
import Client from '../models/Client'
import ClientRacket from '../models/ClientRacket'
import Racket from '../models/Racket'
import StringJob, { StringJobInput, StringJobOutput } from '../models/StringJob'

export const GetAllStringJobsAsync = async () => {
    const sql = `SELECT s.id AS "stringJobId", s.job_date_time_utc AS "jobDateTimeUtc", c.first_name AS "clientFirstName", 
	cr.serial_number AS "racketSerialNumber", 
	r.brand || ' ' || r.model || ' ' || r.year AS "racketName", c.id AS "clientId" 
    FROM "StringJobs" s 
	LEFT OUTER JOIN "Clients" c ON c.id = s.client_id 
	LEFT OUTER JOIN "ClientRackets" cr ON cr.id = s.client_racket_id 
	LEFT OUTER JOIN "Rackets" r ON r.id = cr.racket_id 
    WHERE s.deleted_at IS null AND c.deleted_at IS null`;

    const stringJobListDto: StringJobListDTO[] = await sequelizeConnection.query(sql, {
        type: QueryTypes.SELECT
    });

    return stringJobListDto;
}

export const GetStringJobsByClientId = async (clientId: number): Promise<StringJobOutput[]> => {
    const sql = `SELECT s.id AS "id", 
	s.job_date_time_utc AS "jobDateTimeUtc", 
	s.client_id AS "clientId", 
	s.client_racket_id AS "clientRacketId", 
	r.brand || ' ' || r.model || ' ' || r.year AS "racket",
	s.string_name AS "stringName",
	s.string_type AS "stringType",
	s.tension AS "tension",
	s.tension_type AS "tensionType",
	s.charge_amount AS "chargeAmount",
	s.notes AS "notes"
    FROM "StringJobs" s 
	LEFT OUTER JOIN "Clients" c ON c.id = s.client_id 
	LEFT OUTER JOIN "ClientRackets" cr ON cr.id = s.client_racket_id 
	LEFT OUTER JOIN "Rackets" r ON r.id = cr.racket_id 
    WHERE s.deleted_at IS null AND c.deleted_at IS null AND s.client_id = :id`;

    const clientStringJobs: StringJob[] = await sequelizeConnection.query(sql, {
        replacements: { id: clientId },
        type: QueryTypes.SELECT,
        mapToModel: true
    });

    return clientStringJobs;
}

export const GetStringJobById = async (id: number): Promise<StringJobDetailDTO> => {
    const sql = `SELECT s.id AS "stringJobId", 
	s.job_date_time_utc AS "jobDateTimeUtc", 
	s.client_id AS "clientId", 
	s.client_racket_id AS "clientRacketId", 
	c.first_name AS "clientFirstName", 
	r.brand || ' ' || r.model || ' ' || r.year AS "racketName",
	cr.serial_number AS "racketSerialNumber",
	s.string_name AS "stringName",
	s.string_type AS "stringType",
	s.tension AS "tension",
	s.tension_type AS "tensionType",
	s.charge_amount AS "chargeAmount",
	s.notes AS "notes"
    FROM "StringJobs" s 
	LEFT OUTER JOIN "Clients" c ON c.id = s.client_id 
	LEFT OUTER JOIN "ClientRackets" cr ON cr.id = s.client_racket_id 
	LEFT OUTER JOIN "Rackets" r ON r.id = cr.racket_id 
    WHERE s.deleted_at IS null AND c.deleted_at IS null AND s.id = :id`;

    const stringJobDto: StringJobDetailDTO[] = await sequelizeConnection.query(sql, {
        replacements: { id: id },
        type: QueryTypes.SELECT,
        mapToModel: true
    });

    return stringJobDto[0];
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