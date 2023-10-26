import CartManager from '../managers/CartManager.js'
// Atento que no esta usando CartManager

// Get a cart from server
const getProductsCartFromServer = async (req, res) => {
    console.log("getProductsCartFromServer")
    const cart = new CartManager()
    const cartProducts = await cart.getAllCarts()


    if(Array.isArray(cartProducts)) {
        const length = cartProducts.length
        if (length > 0) {
            let info = {
                status: "success",
                data: cartProducts,
                length: length,
                message: "cart returned successfully"
            }
            return res.status(200).json(info)
        }
        else {
            let info = {
                status: "error",
                data: [],
                length: 0,
                message: "no cart"
            }
            return res.status(400).json(info)
        }
    }
}
const getCartFromServer = async (req, res) => {
    console.log("getCartFromServer -> " + req.params.cid)
    const cart = new CartManager()
    const cartProduct = await cart.getCartById(parseInt(req.params.cid))
    
    if(cartProduct) {
        let info = {
            status: "success",
            data: cartProduct,
            length: 1,
            message: "cart returned successfully"
        }
        return res.status(200).json(info)
    }
    
    else {
        let info = {
            status: "error",
            data: [],
            length: 0,
            message: "no cart"
        }
        return res.status(400).json(info)
    }

}
// add o creates a cart to the server
const addCartOnServer = async (req, res) => {
    res.send('POST one /carts')
}

// add or update an existing product to an existing cart on the server
const addProductCartOnServer = async (req, res) => {
    res.send('POST one product on cart /carts')
}

const cartController = {
    getProductsCartFromServer,
    getCartFromServer,
    addCartOnServer,
    addProductCartOnServer
}
export default cartController