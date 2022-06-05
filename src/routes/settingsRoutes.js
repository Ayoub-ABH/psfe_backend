const express = require("express");
const { getAllSettings, updateSettings } = require("../controllers/settingsController");
const router = express.Router();






//page admin
router.route("/all").get(getAllSettings);
router.route("/update/:id").post(updateSettings);






module.exports = router;