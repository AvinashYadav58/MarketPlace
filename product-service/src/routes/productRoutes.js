const express = require('express');
const { create, list, getById, remove, update} = require('../controllers/productController');

const router = express.Router();

router.post('/create', create);
router.patch('/remove', remove);
router.put('/update', update)
router.get('/', list);
router.get('/:id', getById);


module.exports = router;
