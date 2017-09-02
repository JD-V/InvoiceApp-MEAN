var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Customers = new Schema({
    name : {type:String, required:true},
    address : {type:String, required:true},
    phone : {type:String, required:true},
    createdAt : {type:Date, default : Date.now},
    updatedAt : {type:Date, default : Date.now},
});

// Instance method: update 
Customers.method("update", function(updates,callback) {
    // this => customer document, passed  implicitly
    Object.assign(this,updates,{updatedAt:new Date()});
    this.save(callback);
});

var CustomerModel = mongoose.model("customers", Customers);

module.exports = CustomerModel;
