import fs from "fs";
class ProductManager {
    /*
    Esta clase maneja la creacion de productos.

      PD: No pude modificar un JSON utilizando append. Los JSON me quedaban mal formateados
      Por ende termine creando una lista de los productos en la principal, aunque no quería...
      
      
    NO PUDE: 
    En MEMORIA PRINCIPAL almacena un array de codigos de los productos. Dado que es
    la unica condicion que se chequea para agregar un nuevo producto, y suponiendo
    que es mas frecuente agregar productos que buscarlos por id, por razones
    de eficiencia no convendría ni tener un array de productos en memoria principal
    dado que solo se necesita el subcampo 'code', asi como tampoco convendria
    buscar un codigo en memoria secundaria por ser este un proceso lento).
    
    En MEMORIA SECUNDARIA se almacenan los productos en formato JSON.
    Dado que solo se puede agregar de a 1 (un) producto por vez:
      a) El nuevo codigo se pushea
      b) El nuevo producto se almacenan en memoria secundaria utilizando append.
    
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
        Si bien no tendría sentido buscar en memoria secundaria por como esta implementado,
        lo hago para responder a la consigna. Supongo que más adelante buscaremos en una BD 
        y allí si cobra sentido buscar en memoria secundaria.
        */
       return await fs.promises.readFile(this.#path, "utf-8"); 
    }
    async getProductById(id) {
        let product = this._products.find(product => product.id === id);
        if (!product) {
            console.log("El producto con id " + id + " no existe");
            return null;
        }
        else return await product;
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