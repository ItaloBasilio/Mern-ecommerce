const express = require ('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes

const authRoutes = require('./routes/auth');


//enviroment variable or you can say constants
env.config();

//mongoDB connection
//mongodb+srv://root:<db_password>@cluster0.oxgb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.oxgb8.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser:true, 
        useUnifiedTopology:true,
    
}
).then(() => {
    console.log('🚀 Database connected');


});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);


app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT}`)
});