const express = require("express");
const { createRestaurant, getRestaurants, updateRestaurant, deleteRestaurant, getSingleRestaurant } = require("../controllers/restrauntController");
const check_auth = require("../middlewares/check_auth");
const { restrictTo } = require("../middlewares/restrict-to");
const { Role } = require("../utils/constants");
const router = express.Router();

router.route('/')
    .post(check_auth, restrictTo(Role.owner), createRestaurant)
    .get(check_auth, getRestaurants)


router.route('/:id')
    .get(getSingleRestaurant)
    .delete(check_auth, restrictTo(Role.owner), deleteRestaurant)
    .patch(check_auth, restrictTo(Role.owner), updateRestaurant)

module.exports = router;