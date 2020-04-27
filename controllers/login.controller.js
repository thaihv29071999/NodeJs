var md5 = require("md5");

var db = require("../db");

module.exports.login = function(req, res){
    res.render('auth/login');
};

module.exports.postLogin = function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({ email : email}).value();

    if(!email.length){
        res.render('auth/login', {
            errors: 'Email is required.',
            value: req.body
        });        
        return;
    }else if(!password.length){
        res.render('auth/login', {
            errors: 'Password is required.',
            value: req.body
        });        
        return;
    }

    if(!user){
        res.render('auth/login', {
            errors: 'Email does not exist.',
            value: req.body
        });        
        return;
    }
    var hashPassword = md5(password);
    if(user.password !== hashPassword){
        res.render('auth/login', {
            errors: 'Login failed.',
            value: req.body
        });
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/users');
};