const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
  {
    name: {
      type:String,
      required:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum:['user','admin'],
      default:'user'
    },
    profilePicture:{
        type: String
    },
    billingAddress: {
      phone: { type: String },
      address: { type: String },
      city: { type: String },
      postalCode: { type: String},
      country: { type: String},
    }
  },
  {
    timestamps: true,
  }
);

//method to compare the password returns true or false
userSchema.methods.comparePassword = async function (enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware for encryt the password
userSchema.pre("save", async function (next) {
    
  if (!this.isModified("password")) {
      next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

module.exports = mongoose.model("User", userSchema);
