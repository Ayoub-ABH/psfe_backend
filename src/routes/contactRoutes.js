const express = require("express");
const { addContact, deleteContact, getAllContacts } = require("../controllers/contactController");
const router = express.Router();








//page contact 
router.route("/add").post(addContact);
//page admin
router.route("/all").get(getAllContacts);
router.route("/delete/:id").delete(deleteContact);






module.exports = router;