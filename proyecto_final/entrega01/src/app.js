import express from 'express'
import productsRouter from '../routers/productsRouter.js'
import ProductManager from './ProductManager.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/products', productsRouter)

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})

export default app