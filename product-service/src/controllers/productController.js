const { createProduct, getProducts, getProductById, removeProduct, updateProduct} = require('../services/productService');

async function create(req, res) {
    try {
        req.body.createdby = req.body.email;
        const product = await createProduct(req.body);
        res.status(201).json({product, "message": "Product created"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function list(req, res) {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getById(req, res) {
    try {
        const product = await getProductById(req.params.id);
        console.log('product: ', product);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: 'Product not found' });
    }
}

async function remove(req, res) {
    try {
        req.body.createdby = req.body.email;
        let result = await removeProduct(req.body);
        res.status(200).json({"message": result});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function update(req, res) {
    try {
        req.body.createdby = req.body.email;
        let result = await updateProduct(req.body);
        res.status(200).json({"message": result});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



module.exports = { create, list, getById , remove, update};
