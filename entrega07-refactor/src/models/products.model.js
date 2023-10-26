import mongoose from 'mongoose'

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    title: String,
    description: String,
    code: String,
    price: Number,
    status: String,
    stock: Number,
    category: String,
    thumbnail: String,
    file: String
})
/* PRODUCTS FIELDS:
            id: this.createId(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
            */
export default productsModel = mongoose.model(productsCollection, productsSchema)
