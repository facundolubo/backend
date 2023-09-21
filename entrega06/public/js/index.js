import mongoose from 'mongoose'

/* read user and password securely*/

const fs = await import('fs');
const fileContents = await fs.readFileSync('../../../mongo/auth.txt', 'utf8');
const USER = fileContents.split('\n')[0]
const PASSWORD = fileContents.split('\n')[1]

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

const productsDAO = mongoose.model('products', productsSchema)

try {
    await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.jv8xqu9.mongodb.net/`)
    console.log('Connected')
} catch (error) {
    console.log(error.message)
    console.log("Se intentó loguear con user " + USER + " y password " + PASSWORD)
}

export {productsDAO }