import express from 'express'
import compression from 'compression'
import ProductsRouter from '../routers/ProductsRouter.js'
import cors from 'cors'
import handlebars from 'express-handlebars'

const DEVMODE = (process.env.NODE_ENV !== 'production')
const App = express()

//Handlebars config

App.engine('handlebars', handlebars.engine())

App.set('view engine', 'handlebars')
App.set('views', './src/views')

//hago un puente a la ruta '/home' 
App.use('/', (req, res) => {
    res.render('home')
})

/*
App.use(cors())
App.use(compression())

//Para poder enviar JSON
App.use(express.json())

// Para poder enviar archivos?
App.use(express.urlencoded({ extended: true }))


App.use('/products', ProductsRouter)

// Dar menos información 
App.disable('x-powered-by')

// Standarize status messages. E.g. 404
App.use((err, req, res, next) => {
    res.status(404).send('Not found')
})
*/
App.listen(3000, () => {
    if (DEVMODE) {
        console.log('App in Development mode')
    }
    console.log('App listening on port 3000!')
})

export default App