import {Router } from 'express'
import ProductManager from '../src/ProductManager.js'

const router = Router()
const productManager = new ProductManager('/home/facundol/Documents/Computacion/coderhouse/backend/proyecto_final/entrega01/data/products.json')

/* según convenciones, las rutas deberían ser /api/<version> ej: /api/v1 */

router.get('/', async (req, res) => {
    if (req.query.id !== undefined && req.query.id !== null) {
        const result = await productManager.getProductById(parseInt(req.query.id))
        // Handle the product ID here
        if (result) res.status(200).json({status: 'ok', data: result})
        else res.status(404).json({status: 'error', message: 'Product not found'})
    }
    else {
        const limit = req.query.limit
        if (limit === undefined || limit === null) {
            limit = 10;
        }
        const result = await productManager.getProducts(limit)
        if (typeof result === 'string') {
            const error = result.split(' ')
            return res.status(400).json({status: 'Error', message: error[0]})
        }
        res.status(200).json({status: 'ok', data: result.slice(0, limit)})
    }
})

router.post('/', async (req, res) => {
    try {
        const result = await productManager.addProduct(req.body)
        res.status(200).json({status: 'ok', data: result})
    }
    catch (error) {
        res.status(400).json({
            status: 'Error',
            message: error.message,
            body_sent: req.body,
        })
    }
})

export default router