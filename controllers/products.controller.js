var db = require("../db");

module.exports.listProduct = function (req, res) {
    var pageIndex = parseInt(req.query.page) || 1;
    var pageSize = 8;

    var start = (pageIndex - 1) * pageSize;
    var end = pageIndex * pageSize;
    var count =0;
    for (var i in db.get('products').value()) {
        count++;
    }
    var pageCount = (count % pageSize == 0 ) ? parseInt(count / pageSize) : parseInt(count / pageSize) + 1;
    
    var cartCount = parseInt((db.get('sessions').find({id : req.signedCookies.sessionId}).get('cart'))
                                .reduce((acc,cur) => acc + cur, 0));

    res.cookie('cartCount', cartCount);
    res.render('products/index', {
        products: db.get('products').value().slice(start, end),
        pageCount: pageCount,
        cartCount: cartCount
    });
};
