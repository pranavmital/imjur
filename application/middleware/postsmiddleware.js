const { getRecentPosts, getPostById } = require("../models/Posts")
const { getCommentsForPost } = require('../models/Comments');
const postMiddleware = {}

postMiddleware.getRecentPosts = async function (req, res, next) {

    try {
        let results = await getRecentPosts(8);
        res.locals.results = results;
        if (results.length == 0) {
            req.flash('error', 'No posts have been created yet. But here are the 8 most recent ones.');
        }
        next();

    } catch (err) {
        next(err);
    }
}


postMiddleware.getPostById = async function (req, res, next) {
    try {

        let results = await getPostById(req.params.id);

        if (results && results.length) {
            res.locals.currentPost = results[0];
            next();
        } else {
            req.flash('error', 'This is not the post you are looking for.');
            res.redirect('/');
        }

    } catch (err) {
        next(err);
    }
}

postMiddleware.getCommentsByPostId = async function (req, res, next) {
    let postId = req.params.id;

    try {
        let results = await getCommentsForPost(postId);
        res.locals.currentPost.comments = results;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = postMiddleware;
