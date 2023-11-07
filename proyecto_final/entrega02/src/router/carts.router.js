import { Router } from 'express'
import cartController from '../controllers/CartController.js';

const router = Router()

// GET all carts /api/carts/
router.get('/', cartController.getProductsCartFromServer)
  

// GET one cart /api/carts/:cid
router.get('/:cid', cartController.getCartFromServer)

//POST /api/carts/ 
router.post('/', cartController.addCartOnServer)

//POST /api/carts/:cid/product/:pid  
router.post('/:cid/product/:pid', cartController.addProductCartOnServer)

export default router