const user = require('../models/userModel');
const validator = require("validator");



const register  = async (req,res)=>{

    const {name,email,password} = req.body;


    const userExist = await user.findOne({ email });

    if (userExist) {
        res.send({message:"User already exists"});
    }
    if (!validator.isEmail(email)) {
        res.send({message:"Please provide valid email"});
    }
    if (!validator.isStrongPassword(password)) {
        res.send({message: "At least 8 characters—the more characters, the better. \nA mixture of both uppercase and lowercase letters. A mixture of letters and numbers. Inclusion of at least one special character, e.g., ! @ # ? ]"})
    }

    const User = new user({
        name:name,
        password:password,
        email:email
        })

    User.save((error)=>{

        if (error) {
            res.send({message:"user not registered"})
        } else {
            res.send({message:"user registred"});
        }
    })

}


module.exports = register;