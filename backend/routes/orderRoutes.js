const express = require("express");
const { createOrder, getOrders, getSingleOrder, updateOrderStatus } = require("../controllers/orderController");
const check_auth = require("../middlewares/check_auth");
const { restrictTo } = require("../middlewares/restrict-to");
const { Role } = require("../utils/constants");
const router = express.Router();

router.route('/:id')
    .get(check_auth, getSingleOrder)
    .patch(check_auth, updateOrderStatus)

router.route('/')
    .post(check_auth, restrictTo(Role.user), createOrder)
    .get(check_auth, getOrders)


module.exports = router;