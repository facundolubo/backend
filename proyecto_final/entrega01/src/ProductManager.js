import fs from "fs";
import Product from "./Product.js";

class ProductManager {
    /*
    Esta clase maneja la creacion de productos.

    PD: No pude modificar un JSON utilizando append. Los JSON me quedaban mal formateados
    Por ende termine creando una lista de los productos en la memoria principal, aunque no quería...
      
    */
    #path;
    _counter;
    _products;

    constructor(path) {
        this.#path = path;
        this._counter = 0;
        this._products = [];
        this.#init();
        console.log('El path es: ' + path);
    }

    #init() {
        if (!fs.existsSync(this.#path)) {
            fs.writeFileSync(this.#path, "");
        }
    }
    _incrementId() {
        this._counter++;
    }
    async getProducts() {
        /*
        Si bien no tendría sentido buscar en memoria secundaria por como esta implementado,
        lo hago para responder a la consigna. Supongo que más adelante buscaremos en una BD 
        y allí si cobra sentido buscar en memoria secundaria.
        */
       if (fs.promises.readFile(this.#path, "utf-8").length === 0) {
           console.log ("No hay productos");
           return null;
       }
       else return await fs.promises.readFile(this.#path, "utf-8"); 
    }
    async getProductById(id) {
        let product = this._products.find(product => product.id === id);
        if (!product) {
            console.log("El producto con id " + id + " no existe");
            return null;
        }
        else return await product;
    }
    
    async addProduct(product) {
        if (this._products.find(product => product.code === code)) {
            console.log("El producto con codigo " + code + " ya existe");
            return null;
        }
        else {
            this._products.push(Product); // Agrego el codigo al array.
            this._incrementId();
            await fs.promises.writeFile(this.#path, JSON.stringify(this._products));
        }
    }
}

export default ProductManager;