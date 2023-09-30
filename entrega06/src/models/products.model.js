import mongoose from 'mongoose'

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    file: String,
    code: String,
    stock: Number,
    id: {type: Number, required: true, unique: true}
})

export default productsModel = mongoose.model(productsCollection, productsSchema)
