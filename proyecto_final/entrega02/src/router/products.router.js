import { Router } from 'express';
import productController from '../controllers/ProductController.js';

const router = Router();

// GET /api/products[?:limit=N]
router.get('/', async (req, res) => {
    try {
        const products = await productController.getProductsFromServer(req, res); // Modify this function to fetch products from your server
        res.render('products', { products }); // 'products' is the name of your Handlebars template file (products.handlebars)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
    try {
        const product = await productController.getProductFromServer(req, res); // Modify this function to fetch a specific product by ID
        res.render('product', { product }); // 'product' is the name of your Handlebars template file (product.handlebars)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// POST /api/products
router.post('/', async (req, res) => {
    try {
        const newProduct = await productController.addProductOnServer(req, res); // Modify this function to add a new product to your server
        res.json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
    try {
        const updatedProduct = await productController.updProductOnServer(req, res); // Modify this function to update a product on your server
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
    try {
        const result = await productController.delProductOnServer(req, res); // Modify this function to delete a product from your server
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
