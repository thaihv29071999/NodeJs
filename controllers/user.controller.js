var db = require("../db");
var shortid = require('shortid');

module.exports.list = function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()// get value from db
    });
};

module.exports.search = function(req, res){
    var name = req.query.name;
    var matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
    res.render('users/index',{
        users : matchedUsers
    });
}; 

module.exports.create = function(req, res){
    res.render('users/create')
};

module.exports.postCreate = function(req, res){
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split("\\").slice(1).join("/");
    db.get('users').push(req.body).write();
    res.redirect('/users');
};

module.exports.getId = function(req, res){
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render('users/view',{
        user: user
    });
};