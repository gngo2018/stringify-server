import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface RacketAttributes {
    id: number;
    brand: string;
    model: string;
    year: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface RacketInput extends Optional<RacketAttributes, 'id' | 'brand' | 'model' | 'year'> { }
export interface RacketOutput extends Required<RacketAttributes> { }

class Racket extends Model<RacketAttributes, RacketInput> implements RacketAttributes {
    public id!: number
    public brand!: string
    public model!: string
    public year!: string
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Racket.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'brand'
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'model'
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'year'
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


export default Racket;