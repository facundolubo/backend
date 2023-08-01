const ProductManager = require("./ProductManager");

const productManager = new ProductManager();

const product1 = productManager.addProduct(
  "producto 1",
  "Este es un producto prueba1",
  0,
  "Sin imagen",
  "abc123",
  25
);

const product2 = productManager.addProduct(
  "producto 2",
  "Este es un producto prueba2",
  0,
  "Sin imagen",
  "abc1234",
  25
);


try {
  productManager.addProduct(product1);
  productManager.addProduct(product2);
}
catch (error) {
  console.error(error.message);
}
finally {
  console.log(productManager.getProducts()); 
  const productById = productManager.getProductById(0);
  console.log(productById);
}
