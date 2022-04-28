const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();


//connection db
mongoose.connect('mongodb://localhost:27017/psfe_db')
        .then(()=>console.log('connected to data base'))
        .catch(error => console.log(error));


//env vars
env.config();


//middlewares
app.use(express.json());



app.get('/user',(req,res)=>{
    res.send("hello bro")
})







app.listen(process.env.PORT,()=>console.log("listen  on port 5000"));