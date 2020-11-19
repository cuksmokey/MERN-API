const {validationResult} = require('express-validator');
const BlogPost = require('../model/blog');

exports.createBlogPost = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const err = new Error('Invalid Value');
        err.errStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image Harus Di Upload');
        err.errStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {
            uid: 1,
            name: 'wisnu'
        }
    })

    Posting.save()
    .then(result => {
        res.status(201).json({
            message: "Create Blog Success",
            data: result
        });

    }).catch(err => {
        console.log('err :', err);
    });

}

exports.getAllBlogPost = (req, res, next) => {
    BlogPost.find()
    .then(result => {
        res.status(200).json({
            message: 'Data Blog Post Berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getBlogPostById = (req, res, next) => {
    
    const postId = req.params.postId;
    
    BlogPost.findById(postId)
    .then(result => {
        // jika error
        if(!result){
            const error = new Error('Blog Post tidak Ditemukan')
            error.errStatus = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Data Berhasil di Panggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}