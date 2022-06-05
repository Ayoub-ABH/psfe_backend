const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel')




const addContact = asyncHandler(async (req, res) => {
    const {name,email,objet,message} = req.body;

    if(!name || !email || !objet || !message){
      res.status(400);
      throw new Error("please fill all fields");
    }


    const contact = new Contact({
      name: name,
      objet:objet,
      email: email,
      message:message
    });

    contact.save((error) => {
      if (error) {
        res.status(400)
        throw new Error("contact not added");
      } else {
        res.status(200).json("contact added");
      }
    });

});


//delete a contact
//access Admin
const deleteContact = asyncHandler(async (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (error)=>{
       if(error){
         res.status(404)
         throw new Error ("contact not found");
       }
       else {
         res.json("contact removed");
       }
     } 
    )
 });



 //get all contacts
//access Admin
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    if (contacts) {
      res.status(200).json(contacts);
    } else {
        res.status(404)
        throw new Error("No contacts found")
    }
  });



  module.exports = {
    addContact,
    deleteContact,
    getAllContacts
  };