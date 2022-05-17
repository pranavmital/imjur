var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/error/PostError');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/uploads')
    },
    filename: function(req, file, cb){
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString('hex');
        cb(null, `${randomName}.${fileExt}`);
    },
});

var uploader = multer({storage: storage});
router.use

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
        let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userId) VALUES (?,?,?,?, now(), ?)';
        return db.execute(baseSQL, [title, description, fileUploaded, desinationOfThumbnail, fk_userId]);
    })
    .then(([results, fields]) => {
        if(results && results.affectedRows) {
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

module.exports = router;