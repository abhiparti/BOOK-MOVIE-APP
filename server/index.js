const express = require("express");

const mongoose = require("mongoose");
require('dotenv').config(); 
const app = express();

const PORT = 5003;

const userRoutes = require('./routes/userRoute')
const theatreRoutes = require('./routes/TheatreRoutes')
const movieRoute = require('./routes/movieRoutes');
const showRoutes = require('./routes/showRoutes')

mongoose.connect('mongodb+srv://abhinavparti1810:zswUl8IvW1RBokmd@cluster0.0ybgg0y.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

app.use(express.json())
app.use(express.urlencoded())

app.use('/api/users' , userRoutes )
app.use('/api/theatres' , theatreRoutes )
app.use('/api/movies' , movieRoute )
app.use('/api/shows', showRoutes)

app.listen(PORT, () => {
  console.log("Server Started");
});
