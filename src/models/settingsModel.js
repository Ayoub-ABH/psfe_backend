const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema(
  {
    phone: {
      type:String,
      require:true
    },
    address: {
     type:String,
      require:true
    },
    email: {
      type: String,
      require:true
    }
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
