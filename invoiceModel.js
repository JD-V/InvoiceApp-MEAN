var mongoose = require('mongoose');

var Schema = mongoose.Schema();

var Invoice = new Schema({
    invoice_id : Number,
    product_id : Object,
    qty : Number,
    createdAt : {type:Date, default : Date.now},
    updatedAt : {type:Date, default : Date.now},
});


var InvoiceModel = mongoose.model("invoice", Invoice);

module.exports = InvoiceModel;