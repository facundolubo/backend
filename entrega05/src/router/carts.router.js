import { Router } from 'express'
import cartController from '../controllers/CartController.js';
const router = Router()

// GET /api/carts/:cid 
router.get('/:cid', cartController.getProductsCartFromServer)

//POST /api/carts/ 
router.post('/', cartController.addCartOnServer)

//POST /api/carts/:cid/product/:pid  
router.post('/:cid/product/:pid', cartController.addProductCartOnServer)

export default router