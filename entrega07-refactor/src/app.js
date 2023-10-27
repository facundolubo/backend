import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
//Endpoints
import productRouter from './router/products.router.js'
import cartRouter from './router/carts.router.js'
import viewRouter from './router/view.router.js'
// Para loguear mongo con variables de entorno. La funcion retorna un objeto cliente. 
// Se instancia "const client = await login_mongo();"
// Tener presente que se deberia tener un solo cliente durante la vida de la applicacion debido a que es 'resource intensive'
import login_mongo from '../../../../mongo/login_mongo.js';
// Para poder usar dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))

const mongoClient = await login_mongo();
/// Environment variable
//const DEVMODE = (process.env.NODE_ENV !== 'production')

// Express
const app = express()

//Handlebars config

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

/*
app.use('/', (req, res) => {
    res.render('home', {
        title: 'home',
        layout: 'main',
        layoutDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })

    
    res.render('addProductForm', {
        title: 'addProductForm',
        layout: 'main',
        layoutDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
        product: {
            title: 'das',
            description: '',
            price: '',
            thumbnail: '',
            code: '',
            stock: ''
        }  
    })
    
})
*/
//Less info
app.disable('x-powered-by')
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


app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewRouter)
/*
const auxRouter = express.Router()
auxRouter.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
app.use(auxRouter)
*/
const httpServer = app.listen(3000, () => {
    /*
    if (DEVMODE) {
        console.log('App in Development mode')
    }
    */
    console.log('App listening on port 3000!')
})

const socketServer = new Server(httpServer)

let log = []

socketServer.on('connection', (socketClient) => {
    console.log(`Nuevo cliente conectado: ${socketClient.id}`)
    socketClient.emit('history', log)
    socketClient.on('message', data => {
        // log.push(data)
        log.push({ userId: socketClient.id, message: data })
        socketServer.emit('history', log)
    })
})

export default app