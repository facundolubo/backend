import {Router } from 'express'

const productsRouter = Router()

productsRouter.get('/products', async (req, res) => {
    res.status(200).json({status: 'ok', data: await productManager.getProducts()})
})
productsRouter.get('/products/:id', async (req, res) => {
    const result = users.find(user => user.id === parseInt(req.params.id))
    if (result) res.status(200).json({status: 'ok', data: result})
    else res.status(404).json({status: 'error', message: 'User not found'})
})

export default productsRouter