const express = require('express');
const bodyParser = require('body-parser');
const uri = require('mongoose');

const app = express();
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

// error
app.use((error, req, res, next) => {

    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        message: message,
        data: data
    });
});

uri.connect('mongodb+srv://user:user@cluster0.naexy.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
.then(() => {
    app.listen(4000, () => console.log('Success'));
})
.catch(err => console.log('Ehhh : ', err));

// npm install --save express
// npm install --save express-validator
// npm add nodemon
// npm add body-parser
// npm add mongoose