module.exports.postCreate = function(req, res, next){
    var errors = "";
    if(!req.body.name){
        errors = "Name is required!";
    }else if(!req.body.phone){
        errors = "Phone is required!";
    }
    if(errors.length){
        res.render('users/create', {
            errors: errors,
            value: req.body
        });
        return;
    }
    next();
};