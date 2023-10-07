import express from 'express'
import productsRouter from '../routers/productsRouter.js'
import ProductManager from './ProductManager.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/products', productsRouter)
app.use('/carts', productsRouter)

// const productsManager = new ProductManager('/home/facundol/Documents/Computacion/coderhouse/backend/proyecto_final/entrega01/data/products.json')

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

export default app