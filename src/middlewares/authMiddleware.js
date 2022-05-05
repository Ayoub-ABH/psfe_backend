const jwt = require("jsonwebtoken");

const loginRequire = async (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1]

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
};

module.exports = {
  loginRequire
};
