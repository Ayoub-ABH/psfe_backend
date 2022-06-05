const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type:String,
      require:true
    },
    email: {
     type:String,
      require:true
    },
    objet: {
      type: String,
      require:true
    },
    message:{
      type: String,
      require:true
    }
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
