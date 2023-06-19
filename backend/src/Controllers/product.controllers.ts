import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import express from 'express';
const router = express.Router();
import fileUpload from 'express-fileupload';

// function generateId(type) {
//     const genId = new Date().getTime().toString(36).toUpperCase();
//     if (genId.length === 8) {
//         return (type + '0' + genId).toUpperCase();
//     } else if (genId.length === 9) {
//         return (type + genId).toUpperCase();
//     }
// }

// => localhost:3000/api


router.use(fileUpload({
  createParentPath:true,
  useTempFiles : true,
  tempFileDir : '/images/'}
)); 

router.post('/products', async (req: any, res) => {
  const productRepository = AppDataSource.getRepository(Product);
  const { sku, name, price } = req.body;

  let images = [];

  if (req.files && req.files.images) {
    if (Array.isArray(req.files.images)) {
      images = req.files.images.map((file) => file.name);
      for (let i = 0; i < req.files.images.length; i++) {
        await req.files.images[i].mv('uploads/' + req.files.images[i].name);
      }
    } else {
      images = [req.files.images.name];
      await req.files.images.mv('uploads/' + req.files.images.name);
    }
  }

  const product = productRepository.create({ sku, name, price, images });
  await productRepository.save(product);

  res.json({ data: product, status: true });
});

  
  // Update a product
  router.put('/products/:id', async (req, res) => {
    try {
      const productRepository = AppDataSource.getRepository(Product);
      let images = [];
  
      if (req.body.images) {
        if (Array.isArray(req.body.images)) {
          images = req.body.images.map((file) => file.name);
        } else {
          images = [req.body.images.name];
        }
          await req.body.images.mv('uploads/' + req.body.images.name);
      }
      
      const id = Number(req.params.id);
      const { sku, name, price } = req.body;
      await productRepository.update(id, { sku, name, price, images });
      const updatedProduct = await productRepository.findOne({ where: { id } });
      res.json({ data: updatedProduct, status: true });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  });
  
  
  
  // Get all products
  router.get('/products', async (_, res) => {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find();
    res.json({data:products,status:true});
  });

  router.get('/productById/:id', async (req, res) => {
    const productRepository = AppDataSource.getRepository(Product);
    const id = Number(req.params.id);
    const options: FindOneOptions<Product> = { where: { id: id } };
    const product = await productRepository.findOne(options);
    res.json({ data: product, status: true });
  });
  
  // Delete a product
  router.delete('/productsById/:id', async (req, res) => {
    const productRepository = AppDataSource.getRepository(Product);
    const  id  = Number(req.params.id);
      if (!id) {
      return res.status(400).json({ error: 'Product id is missing' });
    }
  
    try {
      await productRepository.delete(id);
      res.sendStatus(204).json({ status: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  


module.exports = router;