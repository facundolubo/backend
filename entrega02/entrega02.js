import fs from "fs";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();

const product1 = {
  title: "producto 1",
  description: "Este es un producto prueba1",
  price: 500,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
};

const product2 = {
  title: "producto 2",
  description: "Este es un producto prueba2",
  price: 1000,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 72
};

const product3 = {
  title: "producto 3",
  description: "Este es un producto prueba3",
  price: 1500,
  thumbnail: "Sin imagen",
  code: "ABC123",
  stock: 93
};

try {
  //Agrego 3 productos, el 2do no debería ser agregado porque repite el codigo
  productManager.addProduct(product1);
  productManager.addProduct(product2); // no deberia ser agregado
  productManager.addProduct(product3);
}
catch (error) {
  console.error(error.message);
}
finally {
  // Pruebo que me traiga todos los productos. No deberia incluir el 2do
  console.log(productManager.getProducts());
  //Pruebo que ande encontrar producto por id
  console.log(productManager.getProductById(1));
}