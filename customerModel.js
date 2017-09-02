var mongoose = require('mongoose');

var Schema = mongoose.Schema();

var Customers = new Schema({
    name : String,
    address : String,
    phone : string,
    createdAt : {type:Date, default : Date.now},
    updatedAt : {type:Date, default : Date.now},
});

var CustomerModel = mongoose.model("customers", Customers);

module.exports = CustomerModel;
