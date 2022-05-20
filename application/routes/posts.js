var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostModel = require("../models/Posts")
var PostError = require('../helpers/error/PostError');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads')
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString('hex');
        cb(null, `${randomName}.${fileExt}`);
    },
});

var uploader = multer({ storage: storage });

router.post('/createpost', uploader.single('uploadImage'), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let desinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;

    /* DO server side validation 
    * title, description, file should not be undefined,
    * because otherwise the eventual SQL we execute will fail.
    */

    sharp(fileUploaded)
        .resize(200)
        .toFile(desinationOfThumbnail)
        .then(() => {
            return PostModel.create(title, description, fileUploaded, desinationOfThumbnail, fk_userId);
        })
        .then((postWasCreated) => {
            if (postWasCreated) {
                req.flash('success', 'Your post was succesfully created!');
                res.redirect('/');
            } else {
                throw new PostError('Post could not be created!', '/postimage', 200);
            }
        })
        .catch((err) => {
            if (err instanceof PostError) {
                errorPrint('Failed to create post.')
                req.flash('error', err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            } else {
                next(err);
            }
        })
});

router.get('/search', (req, res, next) => {
    let searchTerm = req.query.search;
    if (!searchTerm) {
        res.send({
            resultsStatus: "info",
            message: "No search term given",
            results: []
        });
    } else {
        let baseSQL = `select id, title, description, thumbnail, concat_ws(' ', title, description) AS haystack FROM posts HAVING haystack like ?;`;
        let sqlReadySearchTerm = "%" + searchTerm + "%";
        db.execute(baseSQL, [sqlReadySearchTerm])
            .then(([results, fields]) => {
                if (results && results.length) {
                    res.send({
                        resultsStatus: 'info',
                        message: `${results.length} results found`,
                        results: results
                    });
                } else {
                    db.execute('SELECT id, title, description, thumbnail, created FROM posts ORDER BY created DESC LIMIT 8', [])
                        .then(([results, fields]) => {
                            res.send({
                                resultsStatus: "info",
                                message: "No results were found for your search.",
                                results: results
                            });
                        })
                        .catch((err) => next(err))
                }
            });
    }
});

module.exports = router;