const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      first: {
        type: String,
        required:true
      },
      last: {
        type: String,
        required:true
      }
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

module.exports = mongoose.Model("User", userSchema);
