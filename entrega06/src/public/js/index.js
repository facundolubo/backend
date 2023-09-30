import mongoose from 'mongoose'


/* read user and password securely*/
const fs = await import('fs');
const fileContents = await fs.readFileSync('/home/facundol/Documents/Computacion/mongo/auth.txt', 'utf8');
const USER = fileContents.split('\n')[0]
const PASSWORD = fileContents.split('\n')[1]

/* read json file */


const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    file: String,
    code: String,
    stock: Number,
    /* 
    Entre llaves se agregan propiedades
    De todas maneras, conviene que esto se valide en el frontend
    */
    id: {type: Number, required: true, unique: true}
})

const productsDAO = mongoose.model('products', productsSchema)

try {
    await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.jv8xqu9.mongodb.net/`, 
    {
        dbName: 'coder',
    })
    console.log('DB Connected')
    for (const product of products) {
        const newProduct = await productsDAO.create(
            product
        )
        console.log(newProduct)
    }
} catch (error) {
    console.log(error.message)
    //console.log("Se intentó loguear con user " + USER + " y password " + PASSWORD)
}

export {productsDAO }