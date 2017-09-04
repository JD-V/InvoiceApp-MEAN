var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Product = new Schema({
    name : {type : String, required:true},
    price : {type : Number, required:true},
    createdAt : {type:Date, default : Date.now},
    updatedAt : {type:Date, default : Date.now},
});

Product.method("update",function(updates,callback) {
    Object.assign(this,updates,{updatedAt: new Date()});
    this.save(callback);
})


var ProductModel = mongoose.model("product", Product);

module.exports = ProductModel;