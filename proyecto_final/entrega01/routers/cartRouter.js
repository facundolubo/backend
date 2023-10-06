import {Router } from 'express'
import CartManager from '../src/CartManager.js'

const router = Router()
const cartManager = new CartManager('.data/data/Carts.json')

/* según convenciones, las rutas deberían ser /api/<version> ej: /api/v1 */

router.get('/', async (req, res) => {
    const result = await cartManager.getCarts()
    const limit = req.query.limit
    if (typeof result === 'string') {
        const error = result.split(' ')
        return res.status(400).json({status: 'Error', message: error[0]})
    }
    res.status(200).json({status: 'ok', data: result.slice(0, limit)})
})
router.get('/:id', async (req, res) => {
    const result = await cartManager.getCartById(parseInt(req.params.id))
    if (result) res.status(200).json({status: 'ok', data: result})
    else res.status(404).json({status: 'error', message: 'Cart not found'})
})

export default router