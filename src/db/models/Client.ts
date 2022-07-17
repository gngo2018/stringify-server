import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface ClientAttributes {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  racket: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ClientInput extends Optional<ClientAttributes, 'id' | 'firstName' | 'lastName' | 'phoneNumber' | 'emailAddress' | 'racket'> { }
export interface ClientOutput extends Required<ClientAttributes> { }

class Client extends Model<ClientAttributes, ClientInput> implements ClientAttributes {
  public id!: number
  public firstName!: string
  public lastName!: string
  public racket!: string
  public phoneNumber!: string
  public emailAddress!: string

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
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'phone_number'
  },
  emailAddress: {
    type: DataTypes.STRING,
    field: 'email_address'
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