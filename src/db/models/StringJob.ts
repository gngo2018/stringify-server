import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface StringJobAttributes {
  id: number;
  jobDateTimeUtc: Date;
  clientId: number;
  clientRacketId?: number;
  racket: string;
  stringName: string;
  stringType: string;
  tension: number;
  tensionType: string;
  chargeAmount: number;
  notes: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface StringJobInput extends Optional<StringJobAttributes, 
    'id' | 
    'jobDateTimeUtc' | 
    'clientId' | 
    'clientRacketId' | 
    'racket' | 
    'stringName' | 
    'stringType' |
    'tension' |
    'tensionType' |
    'chargeAmount' |
    'notes' 
> { }
export interface StringJobOutput extends Required<StringJobAttributes> { }

class StringJob extends Model<StringJobAttributes, StringJobInput> implements StringJobAttributes {
  public id!: number;
  public jobDateTimeUtc!: Date;
  public clientId!: number;
  public clientRacketId!: number;
  public racket!: string;
  public stringName!: string;
  public stringType!: string;
  public tension!: number;
  public tensionType!: string;
  public chargeAmount!: number;
  public notes!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

StringJob.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  jobDateTimeUtc: {
    type: DataTypes.DATE,
    field: 'job_date_time_utc'
  },
  clientId: {
    type: DataTypes.INTEGER,
    field: 'client_id'
  },
  clientRacketId: {
    type: DataTypes.INTEGER,
    field: 'client_racket_id'
  },
  racket: {
    type: DataTypes.STRING
  },
  stringName: {
    type: DataTypes.STRING,
    field: 'string_name'
  },
  stringType: {
    type: DataTypes.STRING,
    field: 'string_type'
  },
  tension: {
    type: DataTypes.INTEGER
  },
  tensionType: {
    type: DataTypes.STRING,
    field: 'tension_type'
  },
  chargeAmount: {
    type: DataTypes.INTEGER,
    field: 'charge_amount'
  },
  notes: {
    type: DataTypes.STRING
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

export default StringJob;