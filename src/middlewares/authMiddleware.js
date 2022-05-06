const jwt = require("jsonwebtoken");

const loginRequire = async (req, res, next) => {
  const header = req.headers['authorization'];


  if (header) {
     const token = header.split(' ')[1]

     if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          res.send({message:"not authorised"})
        }else{
          req.user = user;
          next()
        }
      })
    } else {
      res.send({message:"no token found"})
    } 

  } else {
    res.send({message:"no authorization header"})
  }
  
};

module.exports = {
  loginRequire
};
