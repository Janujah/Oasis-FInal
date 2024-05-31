

const User = require('../Models/Signupmodel');
const Doctor = require('../Models/Doctor.model');
const Technician = require('../Models/productmodel');
const Consumer = require('../Models/consult.model');
const Payment = require('../Models/PaymentModel');
const Order = require('../Models/orderModel');


exports.userCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    console.log('User count:', count); // Add this line
    res.json({ count });
  } catch (err) {
    console.error('Error fetching users count:', err); // Add this line
    res.status(500).json({ message: 'Error fetching users count', error: err });
  }
};

exports.doctorCount = async (req, res) => {
  try {
    const count = await Doctor.countDocuments();
    console.log('Doctor count:', count); // Add this line
    res.json({ count });
  } catch (err) {
    console.error('Error fetching doctors count:', err); // Add this line
    res.status(500).json({ message: 'Error fetching doctors count', error: err });
  }
};

exports.technicianCount = async (req, res) => {
  try {
    const count = await Technician.countDocuments();
    console.log('Technician count:', count); // Add this line
    res.json({ count });
  } catch (err) {
    console.error('Error fetching technicians count:', err); // Add this line
    res.status(500).json({ message: 'Error fetching technicians count', error: err });
  }
};

exports.consumerCount = async (req, res) => {
  try {
    const count = await Consumer.countDocuments();
    console.log('Consumer count:', count); // Add this line
    res.json({ count });
  } catch (err) {
    console.error('Error fetching consumers count:', err); // Add this line
    res.status(500).json({ message: 'Error fetching consumers count', error: err });
  }
};

exports.paymentCount = async (req, res) => {
  try {
    const count = await Payment.countDocuments();
    console.log('Payment count:', count); // Add this line
    res.json({ count });
  } catch (err) {
    console.error('Error fetching payments count:', err); // Add this line
    res.status(500).json({ message: 'Error fetching payments count', error: err });
  }
};
exports.orderCount = async (req, res) =>{
  try {
    const count = await Order.countDocuments();
    console.log('Payment count:', count); // Add this line
    res.json({ count });
  } catch (err) {
    console.error('Error fetching payments count:', err); // Add this line
    res.status(500).json({ message: 'Error fetching payments count', error: err });
  }
}

