import {Router } from 'express'
import ProductManager from '../src/ProductManager.js'

const router = Router()
const productManager = new ProductManager('.data/data/products.json')

/* según convenciones, las rutas deberían ser /api/<version> ej: /api/v1 */

router.get('/', async (req, res) => {
    const result = await productManager.getProducts()
    const limit = req.query.limit
    if (typeof result === 'string') {
        const error = result.split(' ')
        return res.status(400).json({status: 'Error', message: error[0]})
    }
    res.status(200).json({status: 'ok', data: result.slice(0, limit)})
})
router.get('/:id', async (req, res) => {
    const result = await productManager.getProductById(parseInt(req.params.id))
    if (result) res.status(200).json({status: 'ok', data: result})
    else res.status(404).json({status: 'error', message: 'Product not found'})
})

export default router