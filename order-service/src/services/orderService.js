const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel.js')
const axios = require('axios');

async function createOrder(orderData, headers) {
    const { userId, productId, quantity } = orderData;
    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if(!product){
        throw new Error('Product not found!');
    }

    console.log("product details: ", "name:", product.name, "price:", product.price, "stock:", product.stock);
    console.log("user details: ", "name:", user.name, "wallet balance:", user.walletBalance);
    
    try{
        const transaction = await axios.post('http://localhost:5003/api/wallet/debit', {
            "userId": userId,
            "amount": totalPrice
        },{
            headers: {
                'Authorization': headers.authorization
            }
        });
        console.log("Debit wallet", transaction.data); 
    }catch(error){
        console.log("Error when debiting form wallet", error.response.data);
        throw new Error('Insufficient wallet balance or Error while debiting');
    }

    if(product.price * quantity > user.walletBalance){
        throw new Error('Insufficient wallet balance!');
    }

    if (product.stock < quantity) {
        throw new Error('Insufficient stock!');
    }

    const totalPrice = product.price * quantity;
    const order = new Order({ userId, productId, quantity, totalPrice });
    await product.updateOne({ $inc: { stock: -quantity } });
    await user.updateOne({ $inc: {walletBalance: -totalPrice}});

    return await order.save();
}

async function getOrderById(orderId) {
    return await Order.findById(orderId);
}

async function getOrdersByUser(userId){
    let orders =  await Order.find({'userId': userId})
    console.log('orders done by user:', orders);
    return orders;
}

async function updateOrderStatus(orderId, status) {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
}

module.exports = { createOrder, getOrderById, updateOrderStatus, getOrdersByUser};
