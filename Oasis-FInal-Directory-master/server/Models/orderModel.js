  const mongoose = require('mongoose');

  const orderSchema = new mongoose.Schema({
    // productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: {type:String, required:true},
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
  });

  const Order = mongoose.model('Order', orderSchema);

  module.exports = Order;


  