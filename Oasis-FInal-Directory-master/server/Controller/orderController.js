const Order = require('../Models/orderModel');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { productName, customerName, address, phoneNumber } = req.body;
    const newOrder = new Order({ productName, customerName, address, phoneNumber  });
    await newOrder.save();
    res.status(201).send('Order placed successfully');
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).send('Failed to place order');
  }
};

// Read all orders
exports.getAllOrders = async (req, res) => {
  try {
    const bookings = await Order.find();
    res.status(200).send(bookings);
} catch (error) {
    res.status(500).send(error);
}
};

// Read single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('productId');
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).send('Failed to fetch order');
  }
};

// Update order by ID
exports.updateOrderById = async (req, res) => {
  try {
    const { customerName, address, phoneNumber } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { customerName, address, phoneNumber },
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).send('Order updated successfully');
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).send('Failed to update order');
  }
};

// Delete order by ID
exports.deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).send('Order deleted successfully');
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).send('Failed to delete order');
  }
};
