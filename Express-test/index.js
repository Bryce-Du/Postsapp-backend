require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(process.env.PORT, () => console.log("server running on port", process.env.PORT)))
    .catch((err) => console.log(err));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

app.get('/', (req, res) => {
    res.json({mssg: "hello app"})
})


const ingredientRoutes = require('./routes/ingredientRoutes')
const authRoutes = require('./routes/authRoutes');

app.use('/api/ingredients', ingredientRoutes)
app.use('/api/user', authRoutes);



