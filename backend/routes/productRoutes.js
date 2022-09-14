import express from 'express';
import Product from '../models/productModel.js';


const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    console.log('GET /api/products');
    const products = await Product.find({});
    res.send(products);
} );

productRouter.get('/slug/:slug',async (req, res) => {
    console.log('GET /api/products/slug/:slug');
    const product = await Product.findOne({slug: req.params.slug});
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
    // res.send(data.products);
});

productRouter.get('/:id', async (req, res) => {
    console.log('GET /api/products/:id');
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
    // res.send(data.products);
});

export default productRouter;

