const { createOrder, getOrderById, updateOrderStatus, getOrdersByUser} = require('../services/orderService');

async function create(req, res) {
    try {
        const order = await createOrder(req.body, req.headers);
        res.status(201).json({order, "message": "Order created"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getById(req, res) {
    try {
        const order = await getOrderById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Order not found' });
    }
}

async function getOrdersOfUser(req, res) {
    try {
        const order = await getOrdersByUser(req.body.userId);
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Order not found' });
    }
}



async function updateStatus(req, res) {
    try {
        const order = await updateOrderStatus(req.params.id, req.body.status);
        res.status(200).json({order, "message": "Order status updated!"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { create, getById, updateStatus, getOrdersOfUser};
