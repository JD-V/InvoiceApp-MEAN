'use strict'

var express = require('express');
var router = express.Router();
var InvoiceModel = require('./invoiceModel');
var lodash = require('lodash');


router.param("iId", function(req,res,next,id){
    InvoiceModel.findById(id, function(err,invoice){
        if(err) return next(err);
        if(!invoice) {
            var error = new Error("Not Found");
            error.status = 404;
            return next(error);
        }
        req.invoice = invoice;
        next();
    })
})

// GET /api/invoices
// Route for retriving invoices 
router.get('/', function(req,res,next) {
    InvoiceModel.find({})
                .sort({createdAt:-1})
                .exec(function(err,invoices) {
                    if(err) return next(err);
                    res.status(201);
                    res.json(invoices);
                })
})  

// POST /api/invoices
// Route for creating a new invoices
router.post('/', function(req,res,next) {
    //create new object of model with req.body
    var invoice =  new InvoiceModel(req.body);
    invoice.save(function(err,invoice) {
        if(err) return next(err);
        res.status(201);
        res.json(invoice);
    })
})


// GET /api/invoices/iId
// Route fot retriving specific inovice by id
router.get('/:iId', function(req,res,next) {
    res.status(201);
    res.json(req.inovice);            
})

// PUT /api/invoices/iId
// Route fot editing specific inovice by id
router.put('/:iId', function(req,res,next) {

    req.invoice.update(function(err,invoice){
        if(err) return next(err);
        res.status(201);
        res.json(invoice);
    })
})


// GET /api/invoices/iId
// Route fot retriving specific invoice by id
router.delete('/:iId', function(req,res,next) {

    InvoiceModel.remove({_id:req.invoice._id}, function(err,respose){
        if(err) return next(err);
        res.status(201);
        res.json(respose); 
    })
})

module.exports  = router;