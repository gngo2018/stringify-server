import Client  from './models/Client'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  Client.sync({ alter: isDev })
}

export default dbInit 