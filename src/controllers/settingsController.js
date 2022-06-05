const asyncHandler = require("express-async-handler");
const Settings = require('../models/settingsModel')










 //get all settings
//access Admin
const getAllSettings = asyncHandler(async (req, res) => {
    const settings = await Settings.find({});
    if (settings) {
      res.status(200).json(settings);
    } else {
        res.status(404)
        throw new Error("No settings found")
    }
  });

//modifier settings
//access admin
const updateSettings = async (req,res)=>{

    Settings.findByIdAndUpdate(req.params.id,{$set: req.body.settings},(error) => {
        if (error) {
            res.status(400)
            throw new Error( "settings not updated");
        } else {
            res.status(200).json("settings updated");
        }
    })
}



  module.exports = {
    getAllSettings,
    updateSettings
  };