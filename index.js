const express = require('express');

const app = express();

app.get('/user',(req,res)=>{
    res.send("hello bro")
})
app.listen(5000,()=>console.log("listen  on port 5000"));