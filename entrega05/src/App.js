import express from 'express'
import compression from 'compression'
import ProductsRouter from '../routers/ProductsRouter.js'
import cors from 'cors'

const DEVMODE = (process.env.NODE_ENV !== 'production')
const App = express()
App.use(cors())
App.use(compression())

//Para poder enviar JSON
App.use(express.json())

// Para poder enviar archivos?
App.use(express.urlencoded({ extended: true }))

//hago un puente a la ruta '/home' para que muestre la carpeta public
App.use('/home', express.static('./public'))
App.use('/products', ProductsRouter)

// Dar menos información 
App.disable('x-powered-by')

// Standarize status messages. E.g. 404
App.use((err, req, res, next) => {
    res.status(404).send('Not found')
})

App.listen(3000, () => {
    if (DEVMODE) {
        console.log('App in Development mode')
    }
    console.log('App listening on port 3000!')
})

export default App