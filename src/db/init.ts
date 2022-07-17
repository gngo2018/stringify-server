import Client  from './models/Client'
import StringJob from './models/StringJob'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  Client.sync({ alter: isDev })
  StringJob.sync({ alter: isDev })
}

export default dbInit 