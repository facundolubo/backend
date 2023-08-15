import fs from "fs";
class ProductManager {
    /*
    Esta clase maneja la creacion de productos.

      PD: No pude modificar un JSON utilizando append. Los JSON me quedaban mal formateados
      Por ende termine creando una lista de los productos en la principal, aunque no quería...
    
    */
    #path;
    _counter;
    _products;

    constructor(path) {
        this.#path = path;
        this._counter = 0;
        this._products = [];
        this.#init();
    }

    #init() {
        if (!fs.existsSync(this.#path)) {
            fs.writeFileSync(this.#path, "");
        }
    }
    incrementId() {
        this._counter++;
    }
    async getProducts() {
        /*
        Si bien no tiene sentido buscar en memoria secundaria por como esta implementado
        lo hago para responder a la consigna
        */
       return await fs.promises.readFile(this.#path, "utf-8"); 
    }
    getProductById(id) {
        let product = this._products.find(product => product.id === id);
        if (!product) {
            console.log("El producto con id " + id + " no existe");
            return null;
        }
        else return product;
    }
    
    async addProduct({title, description, price, thumbnail, code, stock}) {
        if (this._products.find(product => product.code === code)) {
            console.log("El producto con codigo " + code + " ya existe");
            return null;
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
            this._products.push(product); // Agrego el codigo al array.
            this.incrementId();
            await fs.promises.writeFile(this.#path, JSON.stringify(this._products));
        }
    }
}

export default ProductManager;