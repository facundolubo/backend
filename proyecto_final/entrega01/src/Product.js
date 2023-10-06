class Product {
    #title;
    #description;
    #code;
    #price;
    #status;
    #stock;
    #category;
    #thumbnail;
    constructor(title, description, code, price, status, stock, category, thumbnail) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail;
    }
    toString() {
        return JSON.stringify(this);   
    }
    toJSON() {
        return this.toString();
    }
    toArray() {
        return [this.title, this.description, this.code, this.price, this.status, this.stock, this.category, this.thumbnail];
    }
    toCSV() {
        return this.toArray().join(',');
    }
    setCode(code) {
        this.#code = code;
    }
    setStock(stock) {
        this.#stock = stock;
    }
    setStatus(status) {
        this.#status = status;
    }
    setCategory(category) {
        this.#category = category;
    }
    setThumbnail(thumbnail) {
        this.#thumbnail = thumbnail;
    }
    setTitle(title) {
        this.#title = title;
    }
    setDescription(description) {
        this.#description = description;
    }
    setPrice(price) {
        this.#price = price;
    }
}

export default Product;