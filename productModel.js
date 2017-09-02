var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Products = new Schema({
    name : {type : String, required:true},
    price : {type : Number, required:true},
    createdAt : {type:Date, default : Date.now},
    updatedAt : {type:Date, default : Date.now},
});


var ProductModel = mongoose.model("product", Products);

module.exports = ProductModel;