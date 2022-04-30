const express = require('express');
const register = require('../controllers/userController');
const router = express.Router();





router.route("/register").post(register);

router.route("/login").post();



module.exports = router;
