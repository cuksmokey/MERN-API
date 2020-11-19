const express = require('express'); // fw
const bodyParser = require('body-parser');
const uri = require('mongoose'); // connet ke mongodb
const multer = require('multer'); // upload img
const path = require('path'); // mengatasi panggil error img

const app = express();
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

// upload file gambar
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

                                                // middle where

app.use(bodyParser.json());

// error panggil img
app.use('/images', express.static(path.join(__dirname, 'images')));

// img
app.use(multer({
        storage: fileStorage,
        fileFilter: fileFilter
    })
    .single('image')
);

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

uri.connect('mongodb://dbUser:PSn2gUVHSGJhcj4n@mern-shard-00-00.jdcgl.mongodb.net:27017,mern-shard-00-01.jdcgl.mongodb.net:27017,mern-shard-00-02.jdcgl.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-qri8s2-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
// npm install --save multer (kirim file image)