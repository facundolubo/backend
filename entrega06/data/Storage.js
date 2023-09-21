import multer from 'multer' 

const products = []
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './data')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploader = multer({storage})

export default uploader
export {products}