const Product = require('../models/productModel');

async function createProduct(productData) {
    const product = new Product(productData);
    return await product.save();
}

async function removeProduct(productData){
    let productId = productData.productId;

    let product = await Product.findById(productId);

    console.log('product: ', product);

    if(!product){
        throw new Error('Product does not exist');
    }else{
        if(product.createdby != productData.email){
            throw new Error('Only product owner can remove it');
        }else{
            await Product.findByIdAndDelete(productId);
            return "Product deleted.";
        }
    }

}

async function updateProduct(productData){
    let productId = productData.productId;

    let product = await Product.findById(productId);

    console.log('product: ', product);

    if(!product){
        throw new Error('Product does not exist');
    }else{
        if(product.createdby != productData.email){
            throw new Error('Only product owner can update product details');
        }else{
            await Product.findByIdAndUpdate(productId, productData);
            return "Product details updated.";
        }
    }

}

async function getProducts() {
    return await Product.find();
}

async function getProductById(productId) {
    return await Product.findById(productId);
}

module.exports = { createProduct, getProducts, getProductById, removeProduct, updateProduct};
