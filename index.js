var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./router/user.routes');
var loginRoute = require('./router/login.routes');

var middleware = require('./middleware/login.niddleware');
var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-
app.use(express.static('public'))
app.use(cookieParser('aq2adffc012354'))

app.get('/', function (req, res) {
    res.render('index', {
        name: 'Thai Dui'
    });
});

app.use('/users', middleware.requireAuth, userRoute);
app.use('/auth', loginRoute);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))