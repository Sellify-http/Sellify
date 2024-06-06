const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./Routes/userRoutes');
const cors = require('cors');
app.use(cors());
dotenv.config();

app.use(express.json());
app.use("/createUser", userRoutes)

const connection = connectDB();

if(connection){
    app.listen(process.env.PORT || 5000, ()=> {
        console.log(`Server running on port ${process.env.PORT}`);
    })
}