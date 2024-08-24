const express = require('express');
const { create, getById, updateStatus, getOrdersOfUser} = require('../controllers/orderController');

const router = express.Router();

router.post('/create', create);
router.get('/:id', getById);
router.put('/:id/status', updateStatus);
router.get('/:id/byUser', getOrdersOfUser);

module.exports = router;
