const express = require('express');
const {register,login, getUserProfile, getUsers, updateUserprofile, deleteUser} = require('../controllers/userController');
const { loginRequire } = require('../middlewares/authMiddleware');


const router = express.Router();




//simple user
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/:id").get(loginRequire,getUserProfile);

//Admin
router.route("/all").get(loginRequire,getUsers);
router.route("/delete/:id").get(loginRequire,updateUserprofile);
router.route("/update/:id").get(loginRequire,deleteUser);



module.exports = router;
