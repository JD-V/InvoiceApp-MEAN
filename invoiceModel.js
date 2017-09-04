var mongoose = require('mongoose');
var lodash = require('lodash');

var Schema = mongoose.Schema;

var InvoiceProducts = new Schema({
    productId: {type : Schema.Types.ObjectId, required : true},
    qty : {type : Number, required : true},
    price : {type : Number, required : true}
})

var Invoice = new Schema({
    customerId : {type : Schema.Types.ObjectId, required : true},
    discount : {type : Number, required : true},
    total : {type : Number, required : true},
    tax : {type : Number, required : true},
    createdAt : {type:Date, default : Date.now},
    updatedAt : {type:Date, default : Date.now},
    products :[InvoiceProducts]
});


// pre validate hook gets trigggerd before pre save hook
// if there are any validation errors, mongo will not trigger pre save hook
// there for validate pre hook is very useful.
Invoice.pre("validate", function(next){
    console.log("yearh!")
    //convert customer id from string to ObjectId
    Object.assign(this, {customerId : mongoose.Types.ObjectId(this.customerId)})

    //convert product id from string to ObjectId
    lodash.forEach(this.products, function (product) {
        Object.assign(product, { productId : mongoose.Types.ObjectId(product.productId) });
    });
    
    next();
})


Invoice.method("update", function(updates,callback){
    Object.assign(this, updates);
    Object.assign(this, {updatedAt : new Date()} );
    this.save(callback);
});


var InvoiceModel = mongoose.model("invoice", Invoice);

module.exports = InvoiceModel;