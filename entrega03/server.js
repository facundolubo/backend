import express from 'express';
import productManager from './app';

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
})

// a modo de ejemplo para devolver json
server.post('/newproduct', async (req, res) => {
  /* 
  Args: Json with {title, description, price, thumbnail, code, stock}
  */
  try {
    await productManager.addProduct(req.body);
    res.send("Product added");
    res.send(productManager.getProductById(req.body.id))
  }
  catch {
    res.send("Un error ocurrió");
    res.status(400);
  }
})

server.get('/products', async (req, res) => {
  const result = await ProductManager.getProducts();
  if (req.query.limit < 10 || req.query.limit === undefined
     || req.query.limit === null || typeof req.query.limit === 'string') {
    // Si el limite es menor a 10 o es de tipo string, se muestra un minimo de 5 productos
    const limit = 5;
  }
  else {
    const limit = req.query.limit;
  }
  res.send(this._products.slice(0, limit));
})

server.get('/products/:id', (req, res) => {
  res.send(this._products.find(product => product.id === req.params.id));
  res.send(this._products.find(product => product.id === req.query.id));
})

const connectedServer = server.listen(3000, () => {
  console.log('Listening on port 3000');
})