const User = require("../models/userModel");
const validator = require("validator");
const jwt = require("jsonwebtoken");

//register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.send({ message: "User already exists" });
  }
  if (!validator.isEmail(email)) {
    res.send({ message: "Please provide valid email" });
  }
  if (!validator.isStrongPassword(password)) {
    res.send({
      message:
        "At least 8 characters—the more characters, the better. \nA mixture of both uppercase and lowercase letters. A mixture of letters and numbers. Inclusion of at least one special character, e.g., ! @ # ? ]",
    });
  }

  const user = new User({
    name: name,
    password: password,
    email: email,
  });

  user.save((error) => {
    if (error) {
      res.send({ message: "user not registered" });
    } else {
      res.send({ message: "user registred" });
    }
  });
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    if (await user.comparePassword(password)) {
      const token = jwt.sign(
        { id: User._id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.send({ token: token, user: user });
    } else {
      res.send({ message: "invalid password" });
    }
  } else {
    res.send({ message: "invalid email" });
  }
};

//get a user
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send({ user: user });
  } else {
    res.send({ message: "User not found" });
  }
};

//get all users
//access Admin
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.send({ users: users });
};

//update a user
//access Admin
//still not completed
const updateUserprofile = async (req, res) => {
  User.findByIdAndUpdate(req.params.id,{$set: req.body},(error) => {
    if (error) {
        res.send({message:"User not found"})
    }else{
        res.send({message:"User updated "})
    }
})
};

//delete a user
//access Admin
const deleteUser = async (req, res) => {
   User.findByIdAndRemove(req.params.id, (error)=>{

      if(error){
        res.send({ message: "User remove" });
      }
      else {
        res.send({ message: "User not found" });
      }
    } 
   )
};

module.exports = {
  register,
  login,
  getUserProfile,
  getUsers,
  updateUserprofile,
  deleteUser,
};
