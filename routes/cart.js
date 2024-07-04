const express = require('express');
const router = express.Router();
const {
    getCart,
    createCart,
    deleteCart,
    updateCart,
    getParamPname
} = require('../controllers/cart.js')

// localhost:3000/cart
router.get('/', getCart)
.post('/', createCart)
.delete('/', deleteCart)
.put('/', updateCart)
.get('/:user_id', getParamPname)


// // localhost:3000/cart/trader
// router.get('/trader', getUsers)
//     .post('/trader', loginHandle)
//     .delete('/trader', deleteUser)
//     .put('/trader', updateUser)
//     .get('/trader:user_id', getParamUserid)



module.exports = router;