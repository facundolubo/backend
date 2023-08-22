import express from 'express'
import {productsRouter} from './routers/products.router.js'
import {ProductManager} from './ProductManager.js'

const users =[{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }, { id: 3, name: 'Jack Doe' }]

const app = express()

const productManager = new ProductManager('./products.json')



app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})