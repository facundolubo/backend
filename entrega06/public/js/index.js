import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    file: String,
    code: String,
    stock: Number,
    id: Number
})