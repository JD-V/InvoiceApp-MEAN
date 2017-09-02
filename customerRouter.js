'use strict'

var express = require('express');
var router = express.Router();
var Customer = require('./customerModel');

router.param("cId",function(req,res,next,id) {

    Customer.findById(id,function(err,customer){
            if(err) return next(err);
            if(!customer) {
                var error = new Error("Not Found");
                error.status = 404;
                next(error);
            }
            req.customer = customer;
            next();
    })
})

// GET /api/customers
// Route for retriving customers 
router.get('/', function(req,res,next) {
    Customer.find({})
            .sort({createdAt:-1})
            .exec(function(err,customers){
                if(err) return next(err);
                res.status(201);
                res.json(customers);
    })
})

// POST /api/customers
// Route for creating a new customer
router.post('/', function(req,res,next) {
    //create new object of model with req.body
    var customer =  new Customer(req.body);
    if(!customer) {
        var error = new Error("Request body doesn not match with schema")
        err.status = 404;
        next(err);
    }
    console.dir(customer);
    customer.save(function(err,customer){
        if(err) return next(err);
        res.status(201);
        res.json(customer);
    })
});

router.get("/:cId", function(req,res,next) {
    res.status(201);
    res.json(req.customer); 
});

router.put("/:cId", function(req,res,next) {
    req.customer.update(req.body,function(err,customer){
        if(err) return next(err);
        res.status(201);
        res.json(customer);
    });
});

router.delete("/:cId", function(req,res,next) {
    console.log("id  " + req.customer._id);
    Customer.remove({ _id: req.customer._id}, function(err,customer) {
        if(err) return next(err);
        res.status(201);
        res.json(customer);
    });
});

module.exports  = router;
