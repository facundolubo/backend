import cartModel from "../models/cart.model.js";

class CartManager {
    constructor() {}

    async getAllCarts() {
        try {
            const carts = await cartModel.find();
            console.log(typeof carts);
            return carts;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getCartById(idCart) {
        /*
        This method search by id, not by _id
        */
        try {
            const cart = await cartModel.findOne({id: idCart });
            return cart;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async addCart() {
        try {
            const newCart = new cartModel();
            await newCart.save();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async addProductToCart(idCart, idProduct) {
        try {
            const cart = await cartModel.findById(idCart);
            if (cart) {
                cart.products.push(idProduct);
                await cart.save();
                return true;
            } else {
                return false; // Cart not found
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default CartManager;
