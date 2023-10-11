import ProductManager from "../managers/ProductManager.js"

const getAllProductsFromServer = async (req, res) => {
    console.log("getAllProductsFromServer")
    const products = new ProductManager()
    const listProducts = await products.getAllProducts()

    if(Array.isArray(listProducts)) {
        const length = listProducts.length

        if (length > 0) {
            let info = {
                status: "success",
                data: listProducts,
                length: length,
                message: "products returned successfully"
            }
            return res.status(200).json(info)
        }

        let info = {
            status: "error",
            data: [],
            length: 0,
            message: "no products"
        }
        return res.status(400).json(info)
    }
}

const getNProductsFromServer = async (req, res) => {
    console.log("getNProductsFromServer")
    let {limit} = req.query
    limit = parseInt(limit)

    /* return the amount of product requested */

    if(!isNaN(limit) && limit > 0) {
        const products = new ProductManager()
        const listProducts = await products.getProducts(limit)        

        if(Array.isArray(listProducts)){
            const length = listProducts.length

            if(length > 0){
                let info = {
                    status: length === limit ? "success" : "partial",
                    data: listProducts,
                    length: length,
                    message: length === limit? "products returned successfully" : "Not all the requested products were available."
                }
                return res.status(200).json(info)
            }

            else {
                let info = {
                status: "error",
                data: [],
                length: 0,
                message: "no products"
                }
                return res.status(400).json(info)
            }
        }
    }
    else {
        let info = { 
            status: "error",
            data: [],
            length: 0,
            message: "the argument of limit is not a positive integer",   
        }
        return res.status(200).json(info)
    }
}


// Get all or N products from server /api/products[?:limit=N]
const getProductsFromServer = async (req, res) => {
    console.log("getProductsFromServer")
    const limit = req.query.limit
    console.log("limit:" + limit)

    if (req.query.limit) {
        return getNProductsFromServer(req, res)
    }
    else {
        return getAllProductsFromServer(req, res)
    }
}
// Get a product from server /api/products/:pid 
const getProductFromServer = async (req, res) => {
    console.log("getProductFromServer -> " + req.params.pid)
    const productManager = new ProductManager()
    const product = await productManager.getProductById(parseInt(req.params.pid))
    
    if(product) {
        let info = {
            status: "success",
            data: product,
            length: 1,
            message: "product returned successfully"
        }
        return res.status(200).json(info)
    }
    
    else {
        let info = {
            status: "error",
            data: [],
            length: 0,
            message: "no product"
        }
        return res.status(400).json(info)
    }

}

// Add a product to the server
const addProductOnServer = async (req, res) => {
    res.send('POST one of /products')
}

// Update a product to the server
const updProductOnServer = async (req, res) => {
    res.send('PUT one of /products')
}

// Delete a product to the server
const delProductOnServer = async (req, res) => {
    res.send('PUT one of /products')
}

const productController = {
    getAllProductsFromServer,
    getNProductsFromServer,
    getProductsFromServer,
    getProductFromServer,
    addProductOnServer,
    updProductOnServer,
    delProductOnServer
}

export default productController