const db = require("../config/database");

const PostModel = {};

PostModel.create = function (title, description, photopath, thumbnail, fk_userId) {
    let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userId) VALUES (?,?,?,?, now(), ?)';
    return db.execute(baseSQL, [title, description, photopath, thumbnail, fk_userId])
        .then(([results, fields]) => {
            return Promise.resolve(results && results.affectedRows);
        })
        .catch((err) => Promise.reject(err));
}

PostModel.search = function (search) {

}

PostModel.getRecentPosts = function (numberOfPost) {
    let baseSQL = 'SELECT id, title, description, thumbnail, created FROM posts ORDER BY created DESC LIMIT ?';
    return db.execute(baseSQL, [`${numberOfPost}`])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
};


PostModel.getPostById = (postId) => {
    let baseSQL = "select u.username, p.title, p.description, p.photopath, p.created FROM users u JOIN posts p ON u.id = fk_userId WHERE p.id=?;";

    return db.execute(baseSQL, [postId])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch(err => Promise.reject(err));
}

module.exports = PostModel;
