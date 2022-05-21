const User = require("../models/userModel");
const validator = require("validator");
const asyncHandler = require('express-async-handler')

const jwt = require("jsonwebtoken");

//register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password){
    res.status(400);
    throw new Error("please fill all fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Please provide valid email");
  }
  if (!validator.isStrongPassword(password)) {
    res.status(400);
    throw new Error(
      "the password shoud be at least 8 characters—the more characters, the better. \nA mixture of both uppercase and lowercase letters. A mixture of letters and numbers. Inclusion of at least one special character, e.g., ! @ # ? ]"
    );
  }

  const user = new User({
    name: name,
    password: password,
    email: email,
  });

  user.save((error) => {
    if (error) {
      res.status(400)
      throw new Error("user not registered");
    } else {
      res.status(200).json({ message: "user registred" });
    }
  });
});

//login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    res.status(400);
    throw new Error("please fill all fields");
  }
  
  const user = await User.findOne({ email });

  if (user) {
    if (await user.comparePassword(password)) {
      const token = jwt.sign(
        { id: user._id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json({ token: token, user: user });
    } else {
      res.status(400)
      throw new Error("invalid password");
    }
  } else {
    res.status(400)
    throw new Error("invalid email");
  }
});

//get a user
const getUserProfile = async (req, res) => {

  console.log(req.user)
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({ user: user });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

//get all users
//access Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//update a user
//access Admin
//still not completed
const updateUserprofile =asyncHandler( async (req, res) => {
  User.findByIdAndUpdate(req.params.id,{$set: req.body},(error) => {
    if (error) {
        res.status(404)
        throw new Error("User not found")
    }else{
        res.json({message:"User updated "})
    }
})
});

//delete a user
//access Admin
const deleteUser = asyncHandler(async (req, res) => {
   User.findByIdAndRemove(req.params.id, (error)=>{

      if(error){
        res.status(404)
        throw new Error ("User not found");
      }
      else {
        res.json({ message: "User removed" });
      }
    } 
   )
});

module.exports = {
  register,
  login,
  getUserProfile,
  getUsers,
  updateUserprofile,
  deleteUser,
};
