const express = require("express");
const {
  register,
  login,
  getUserProfile,
  getUsers,
  addUser,
  updateUserprofile,
  deleteUser,
} = require("../controllers/userController");
const { loginRequire } = require("../middlewares/authMiddleware");
const {upload} = require("../middlewares/uploadMiddleware")

const router = express.Router();

//simple user
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/:id").get(loginRequire, getUserProfile);

//Admin

router.route("/all").get(getUsers);
router.route("/add").post(upload.single('image'),addUser)
router.route("/update/:id").put(upload.single('image'),updateUserprofile);
router.route("/delete/:id").delete(deleteUser);

module.exports = router;
