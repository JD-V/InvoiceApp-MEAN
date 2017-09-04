'use strict'

var express = require('express');
var router = express.Router();
var ProductModel = require('./productModel');
var lodash = require('lodash');

router.param("pId",function(req,res,next,id) {

    ProductModel.findById(id,function(err,product) {
        if(err) return next(err);
        if(!product) {
            var err = new Error("Not Found");
            err.status = 404;
            return next(err);   // must put return before next(err) otherwise it will keep executing next mathcing route.
        }
        req.product = product;
        next();
    })
})

router.get("/",function(req,res,next) {
    ProductModel.find({})
                .sort({createdAt:-1})
                .exec(function(err,products){
                    if(err) return next(err);
                    res.status(201);
                    res.json(products);
                })
})


router.post("/", function(req,res,next) {

    var product = new ProductModel(lodash.pick(req.body,['name', 'price']));
    
    if( !(lodash.hasIn(req.body,'name') && lodash.hasIn(req.body,'price')) ) {
        var error = new Error("Request body does not match with schema");
        error.status  = 404;
        return next(error);
    }
    product.save(function(err,product){
        if(err) return next(err);
        res.status(201);
        res.json(product);
    });
})


router.get("/:pId", function(req,res,next){
    res.status(201);
    res.json(req.product);
})


router.put("/:pId", function(req,res,next){
    req.product.update(lodash.pick(req.body,['name', 'price']),function(err,product){
        if(err) return next(err);
        res.status(201);
        res.json(product);
    });
})

router.delete("/:pId", function(req,res,next){

    ProductModel.remove({_id:req.product._id}, function(err,respose){
        if(err) return next(err);
        res.status(201);
        res.json(respose);
    })
})

module.exports  = router;