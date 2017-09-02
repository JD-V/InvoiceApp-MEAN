'use strict'

var express = require('express');
var router = express.Router();
var Invoice = require('./invoiceModel');

// GET /api/invoices
// Route for retriving invoices 
router.get('/', function(req,res,next) {
    Invoice.find({})
            .sort({createdAt:-1})
            .exec(function(err,res) {
                if(err) return next(err);
                res.status(201);
                res.json(res);
    })
})  

// POST /api/invoices
// Route for creating a new invoices
router.post('/', function(req,res,next) {
    //create new object of model with req.body
    var invoice =  new Invoice(req.body);

    invoice.save(function(err,res){
        if(err) return next(err);
        res.status(201);
        res.json(res);
    })
})

module.exports  = router;