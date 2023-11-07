import productModel from "../models/products.model.js"

class ProductManager {
  constructor() {}

  async getAllProducts() {
    console.log('getAllProducts')
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getProducts(nProducts) {
    console.log('getProducts')
    try {
      const products = await productModel.find().limit(nProducts);
      return products;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getProductById(idProduct) {
    console.log('getProductById')
    try {
      const product = await productModel.findOne({id : idProduct });
      return product;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async addProduct(data) {
    console.log('addProduct')
    try {
      const newProduct = new productModel(data);
      await newProduct.save();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateProductById(idProduct, dataUpdate) {
    console.log('updateProductById')
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(
        idProduct,
        dataUpdate,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteProductById(idProduct) {
    console.log('deleteProductById')
    try {
      const deletedProduct = await productModel.findByIdAndDelete(idProduct);
      return deletedProduct ? true : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default ProductManager;
