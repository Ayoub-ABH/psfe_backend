const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const { errorHandler } = require('./src/middlewares/errorMiddleware');



//connection db
mongoose.connect('mongodb://localhost:27017/psfe_db')
        .then(()=>console.log('connected to data base'))
        .catch(error => console.log(error));


//env vars
env.config();


//middlewares
app.use(express.json());
app.use(cors())




//---Main routes----//

//user routes
app.use("/api/user", userRoutes);

//product routes
app.use("/api/product",productRoutes)


//order routes
app.use("/api/order",orderRoutes)

//review routes
app.use("/api/review",reviewRoutes)


//midlware of errors
app.use(errorHandler)



app.listen(process.env.PORT,()=>console.log("listen  on port 5000"));