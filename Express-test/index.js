require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(process.env.PORT, () => console.log("server running on port", process.env.PORT)))
    .catch((err) => console.log(err));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

app.get('/', (req, res) => {
    res.json({ mssg: "hello app" })
})


const ingredientRoutes = require('./routes/ingredientRoutes')
const postRoutes = require('./routes/postRoutes')
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')

app.use('/api/ingredients', ingredientRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);



