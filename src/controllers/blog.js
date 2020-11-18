const {validationResult} = require('express-validator');
const BlogPost = require('../model/blog');

exports.createBlogPost = (req, res, next) => {

    const title = req.body.title;
    // const image = req.body.image;
    const body = req.body.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const err = new Error('Invalid Value');
        err.errStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const Posting = new BlogPost({
        title: title,
        body: body,
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