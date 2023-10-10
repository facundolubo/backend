import CartManager from './../helpers/CartManager.js'
// Atento que no esta usando CartManager

// Get a cart from server
const getProductsCartFromServer = async (req, res) => {
    res.send('GET one /carts')
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
    addCartOnServer,
    addProductCartOnServer
}
export default cartController