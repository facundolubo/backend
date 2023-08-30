import express from 'express'
import { products } from '../data/Storage.js'
import uploader from '../data/Storage.js'
const router = express.Router()

router.get('/', (req, res) => res.json({ products }))
router.get('/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id))
    if (!product) return res.status(404).json({ status: 'error', error: 'Producto no encontrado' })
    res.json(product)
})
router.post('/', uploader.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ status: 'error', error: 'No hay archivo adjunto', product: req.body })
    const product = req.body
    product.id = products.length === 0 ? 1 : products[products.length-1].id+1
    product.url = `http://localhost:3000/products/${req.file.filename}`
    products.push(product)
    res.json(product)
})

export default router