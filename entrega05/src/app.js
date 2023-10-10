import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

// Para poder usar dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))

/// Environment variable
const DEVMODE = (process.env.NODE_ENV !== 'production')

// Express
const app = express()

//Handlebars config

app.engine('handlebars', handlebars.engine(
    {
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    }
    ))
    app.set('view engine', 'handlebars')
    app.set('views', './src/views')
    
    //Less info
    app.disable('x-powered-by')
    
    // public
    app.use(express.static('./src/public'))
    //Para poder enviar JSON
    app.use(express.json())
    // Para poder enviar form
    app.use(express.urlencoded({ extended: true }))
    //Endpoints
    app.use('/', (req, res) => {
        res.render('home', {
            title: 'Home' ,
            layout: 'main',
            layoutDir: __dirname + '/views/layouts',
            partialsDir: __dirname + '/views/partials',
        })
        /*
        res.render('addProductForm', {
            title: 'Add Product',
            layout: 'main',
            layoutDir: __dirname + '/views/layouts',
            partialsDir: __dirname + '/views/partials',
        })
        */
    })
    
    
import productRouter from './router/products.router.js'
import cartRouter from './router/carts.router.js'

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

// Standarize status messages. E.g. 404
app.use((err, req, res, next) => {
    res.status(404).send('Not found')
})

const httpServer = app.listen(3000, () => {
    if (DEVMODE) {
        console.log('App in Development mode')
    }
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