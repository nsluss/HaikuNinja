var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('my-application');

var app = express();

// view engine setup
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/api'));



//error messages
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({error: err.status});
});





var arg, ind, portSet, _i, _ref;

for (ind = _i = 0, _ref = process.argv.length; 0 <= _ref ? _i <= _ref : _i >= _ref; ind = 0 <= _ref ? ++_i : --_i) {
  arg = process.argv[ind];
  if (arg === '--port' || arg === '-p') {
    console.log(process.argv[ind + 1]);
    app.set('port', process.env.PORT || process.argv[ind + 1]);
    portSet = true;
  }
}

if (!portSet) {
  app.set('port', process.env.PORT || 3000);
}

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
