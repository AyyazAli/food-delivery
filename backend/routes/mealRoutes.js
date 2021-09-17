const express = require("express");
const { createMeal, getMeals, getSingleMeal, deleteMeal, updateMeal } = require("../controllers/mealsController");
const check_auth = require("../middlewares/check_auth");
const { restrictTo } = require("../middlewares/restrict-to");
const { Role } = require("../utils/constants");
const router = express.Router();

router.route('/')
    .post(check_auth, restrictTo(Role.owner), createMeal)
    .get(check_auth, getMeals)

router.route('/:id')
    .get(getSingleMeal)
    .delete(check_auth, restrictTo(Role.owner), deleteMeal)
    .patch(check_auth, restrictTo(Role.owner), updateMeal)

module.exports = router;