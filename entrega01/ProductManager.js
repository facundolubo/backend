module.exports = class ProductManager {
    //make code a private property with an autoincrement id
    _counter = 0;
    _products = [];

    constructor() {
        this._products = [];
        this._counter = 0;
    }

    incrementId() {
        this._counter++;
    }
    getProducts() {
        return this._products;
    }

    addProduct({title, description, price, thumbnail, code, stock}) {
        if (this._products.find(product => product.code === code)) {
            console.log("El producto ya existe");
            return;
        }
        else {
            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id: this._counter,
            };
            this._products.push(product);
            this.incrementId();
        }
    }

    getProductById(id) {
        let product = this._products.find(product => product.id === id)
        if (!product) {
            console.log("El producto con id " + id + " no existe");
            return null;
        }
        else return product;
    }
}
