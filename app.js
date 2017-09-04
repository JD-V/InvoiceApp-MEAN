'use strict'

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var customerRouter = require('./customerRouter');
var productRouter = require('./productRouter');
var invoicesRouter = require('./invoicesRouter');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/inventory");

var db = mongoose.connection;

db.on('error', function(err) {
    console.error("eror connection database : " + err);
})

db.once('open', function(){
    console.log("database connection established");
})

var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());


app.use('/api/customers', customerRouter);
app.use('/api/products', productRouter);
app.use('/api/invoices', invoicesRouter);

// all the request for undhandled routes will go here.
app.use(function(req,res,next){
    var error = new Error("Not Found");
    error.status = 404;
    next(error);    // will signal the express that there has been some unhandled error, please take care
});

//custom error handler
app.use(function(err,req,res,next) {
    res.status(err.status || 500); // it can be Not Found(404) or internal server error(500)
    res.json({
        message : err.message
    });
});

var port = 3002 || process.env.port;
app.listen(port, function(err){
    if(err) console.error(err);
    console.log('express app is listening on ' + port);
});