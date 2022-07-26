import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Client from './Client';
import Racket from './Racket';

interface ClientRacketAttributes {
    id: number;
    serialNumber: string;
    clientId: number;
    racketId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ClientRacketInput extends Optional<ClientRacketAttributes, 'id' | 'serialNumber' | 'clientId' | 'racketId' > { }
export interface ClientRacketOutput extends Required<ClientRacketAttributes> { }

class ClientRacket extends Model<ClientRacketAttributes, ClientRacketInput> implements ClientRacketAttributes {
    public id: number;
    public serialNumber: string;
    public clientId: number;
    public racketId: number;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

ClientRacket.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    serialNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'serial_number'
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'client_id'
    },
    racketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'racket_id'
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
    },
    deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
    }
},
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true
    })



export default ClientRacket;