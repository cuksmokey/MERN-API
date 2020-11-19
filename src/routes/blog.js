const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const blogController = require('../controllers/blog');

// validasi
router.post('/post', [
        body('title').isLength({min: 5}).withMessage('Title Tidak Sesuai'),
        body('body').isLength({min: 5}).withMessage('Body Tidak Sesuai')
    ],
    blogController.createBlogPost);

// ambil data all
router.get('/posts', blogController.getAllBlogPost);

// ambil data per id
router.get('/post/:postId', blogController.getBlogPostById);

module.exports = router;