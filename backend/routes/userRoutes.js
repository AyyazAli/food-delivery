const express = require("express");
const { getUsers, updateUser } = require("../controllers/userController");
const check_auth = require("../middlewares/check_auth");
const { restrictTo } = require("../middlewares/restrict-to");
const { Role } = require("../utils/constants");
const router = express.Router();
const { createUser, login } = require('./../controllers/authController')

router.route('/sign-up').post(createUser)
router.route('/login').post(login)

router.route('/')
    .get(check_auth, restrictTo(Role.owner), getUsers)
router.route('/:id')
    .patch(check_auth, restrictTo(Role.owner), updateUser)

module.exports = router;
