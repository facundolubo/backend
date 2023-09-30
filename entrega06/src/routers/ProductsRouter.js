import express from 'express'
const router = express.Router()

const jsonFile = fs.readFileSync('/home/facundol/Documents/Computacion/coderhouse/backend/entrega06/data/products.json',
    'utf-8')
const products = JSON.parse(jsonFile);

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