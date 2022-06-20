import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface ClientAttributes {
  id: number;
  firstName: string;
  lastName: string;
  racket: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ClientInput extends Optional<ClientAttributes, 'id' | 'firstName' | 'lastName' | 'racket'> { }
export interface ClientOutput extends Required<ClientAttributes> { }

class Client extends Model<ClientAttributes, ClientInput> implements ClientAttributes {
  public id!: number
  public firstName!: string
  public lastName!: string
  public racket!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Client.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'last_name'
  },
  racket: {
    type: DataTypes.TEXT
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

export default Client;