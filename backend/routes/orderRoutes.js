const express = require("express");
const { createOrder } = require("../controllers/orderController");
const check_auth = require("../middlewares/check_auth");
const { restrictTo } = require("../middlewares/restrict-to");
const { Role } = require("../utils/constants");
const router = express.Router();

router.route('/')
    .post(check_auth, restrictTo(Role.user), createOrder)

module.exports = router;