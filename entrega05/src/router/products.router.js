import { Router } from 'express'

import productController from '../controllers/ProductController.js';

const router = Router()

// GET  /api/products[?:limit=N] 
router.get('/', productController.getProductsFromServer )

// GET 	/api/products/:pid  
router.get('/:pid', productController.getProductFromServer )

// POST /api/products
router.post('/', productController.addProductOnServer )

// PUT /api/products/:pid 
router.put('/:pid', productController.updProductOnServer ) 

// DELETE /api/products/:pid
router.delete('/:pid', productController.delProductOnServer)

export default router