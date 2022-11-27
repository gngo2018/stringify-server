import { Dialect, Sequelize } from 'sequelize'
const environment = process.env.NODE_ENV;
const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDialect = process.env.DB_DIALECT as Dialect
const dbPassword = process.env.DB_PASSWORD

let dialectOptions = {}

if(environment !== 'Development'){
  dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  dialectOptions: dialectOptions
})

sequelizeConnection.authenticate().then(() => {
  console.log('Connection to database has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to database:', err);
});

export default sequelizeConnection