module.exports = class ProductManager {
    //make code a private property with an autoincrement id
    static counter = 0;

    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.find(product => product.code === code)) {
            throw new Error("Product code already exists");
        }

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.counter++,
        };

        this.products.push(product);

        return product;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
}
