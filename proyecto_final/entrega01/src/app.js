import express from 'express'
import productsRouter from '../routers/productsRouter.js'
import ProductManager from './ProductManager.js'
import cors from 'cors'

const app = express()
const DEVMODE = (process.env.NODE_ENV !== 'production')

app.use(cors())
app.use(express.json())

app.use('/products', productsRouter)

app.listen(3000, () => {
    if (DEVMODE) {
        console.log('App in Development mode')
    }
    console.log('App listening on port 3000!')
})

export default app