import fs from "fs";

class ProductManager {
    /*
    Esta clase maneja la creacion de productos.

    PD: No pude modificar un JSON utilizando append. Los JSON me quedaban mal formateados
    Por ende termine creando una lista de los productos en la memoria principal, aunque no quería...
    
    Estructura JSON de un producto:
        "id":1,
		"title":"Norwegian Wood (Noruwei no mori)",
		"description":"ornare consequat lectus in est risus auctor sed tristique in tempus sit",
		"code":"IPG389",
		"price":228.01,
		"status":true,
		"stock":109,
		"category":"Drama|Romance",
        "thumbnails": [
            "http://dummyimage.com/100x100.png/5fa2dd/ffffff",
        ]

            const product = {
                id: this._counter
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails,
            }
    */
    #path;
    _counter;

    constructor(path) {
        this.#path = path;
        this._counter = 0;
        this._products = [];
        this.#init();
        console.log('El path es: ' + path);
        console.log('Product manager inicializado con estos productos: ' + '\n');
    }

    async #init() {
        if (!fs.existsSync(this.#path)) {
            await fs.writeFileSync(this.#path, "");
        }
        else {
            const rawString = await fs.promises.readFile(this.#path, "utf-8");
            const json = JSON.parse(rawString);
            this._products = json.products;
            this._counter = json.counter;
            console.log(this._products);
        }
    }

    _incrementId() {
        this._counter++;
    }
    getProducts(limit) {
        if (limit === undefined || limit === null) {
            limit = 10;
            console.log(limit)
        }
        return this._products.slice(0, limit);
    }
    
    async getProductById(id) {
        let product = this._products.find(product => product.id === id);
        if (!product) {
            console.log("El producto con id " + id + " no existe");
            return null;
        }
        else return await product;
    }
    
    async addProduct({title, description, code, price, status, stock, category, thumbnails}) {
        /* id !== code */
        if (code !== '' && code !== undefined && this._products.find(product => product.code === code)) {
            console.log("El producto con codigo " + code + " ya existe");
            return null;
        }
        else {
            const product = {
                id: this._counter,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            }
            this._products.push(product);
            this._incrementId();
            await fs.promises.writeFile(this.#path, JSON.stringify(this._products, null, 2), "utf-8");
            // Agrego el codigo al array.
            /* print product added */
            return product;
        }
    }
}

export default ProductManager;