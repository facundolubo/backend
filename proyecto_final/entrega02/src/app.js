import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

//Endpoints
import productRouter from './router/products.router.js'
import cartRouter from './router/carts.router.js'
import viewRouter from './router/view.router.js'

import dotenv from 'dotenv'
import mongoose from 'mongoose'; 
import login_mongo from '../../../../../mongo/login_mongodb.js';

dotenv.config()

// const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const MONGO_DB_NAME = process.env.MONGO_DB
/// Environment booleans
const LOCAL_DB = (process.env.MONGO_URI == 'mongodb://127.0.0.1:27017/')
const DEVMODE = (process.env.NODE_ENV !== 'production')

if (LOCAL_DB) {
    console.log('Local MongoDB.\nURI: ' + process.env.MONGO_URI + '\nDB: ' + process.env.MONGO_DB)
}
else {
    console.log('Remote MongoDB')
    try {
        const client = await login_mongo();
        const MONGO_URI = process.env.MONGO_URI
    } 
    catch (error) {
        console.log(error);
    }
}
// Express
const app = express()

// Less info
app.disable('x-powered-by')

// Handlebars config
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')
// public
app.use(express.static('./src/public'))
//Para poder enviar JSON
app.use(express.json(
    {
        extended: true,
        parameterLimit: 10240000,
        type: 'application/json',
    }
))
app.use(express.urlencoded({ extended: true }))

// API endpoints
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewRouter)

const httpServer = app.listen(PORT, () => {
    if (DEVMODE) {
        console.log('HTTP Server in Development mode on port ' + PORT)
    }
})

const socketServer = new Server(httpServer)

let log = []

try {
    await mongoose.connect(MONGO_URI, {dbName: MONGO_DB_NAME} );
    socketServer.on('connection', (socketClient) => {
        console.log(`Nuevo cliente conectado: ${socketClient.id}`)
        socketClient.emit('history', log)
        socketClient.on('message', data => {
            // log.push(data)
            log.push({ userId: socketClient.id, message: data })
            socketServer.emit('history', log)
        })
    })
} catch (error) {
    console.log(error);    
}

export default app