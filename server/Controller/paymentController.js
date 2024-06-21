const stripe = require("stripe")("sk_test_51PGywdBwqNocB2yIoCnux60sakPEmMZvfzCi2GZaIHoUeSQaSxJfv23pWmWMZefdrFIztNjw28Mk6MTkqMlsKveh006M5Xp3br");
// const { v4: uuidv4 } = require('uuid');
const Transaction = require('../Models/PaymentModel');
const Booking = require('../Models/consult.model');  
const Doctor = require('../Models/Doctor.model');    


exports.payMent = async (req, res) => {
  const { token, booking } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const charge = await stripe.charges.create({
      amount: 1500 * 100,
      currency: 'lkr',
      customer: customer.id,
      receipt_email: token.email,
      description: 'Booking for Doctor consultation',
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country
        }
      }
    });

    // Save transaction details in the database
    const transaction = new Transaction({
      customerId: customer.id,
      chargeId: charge.id,
      amount: charge.amount,
      currency: charge.currency,
      description: charge.description,
      receiptEmail: charge.receipt_email,
      status: charge.status,
      createdAt: charge.created,
      shipping: charge.shipping
    });

    await transaction.save();

    // Create new booking
    const newBooking = new Booking({
      // populate booking fields accordingly
      doctorId: booking.doctorId,
      // add other necessary booking details from req.body
    });

    await newBooking.save();

    res.status(200).json({ message: 'Payment successful', bookingId: newBooking._id, doctorId: booking.doctorId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment Failed' });
  }
}


exports.PaymentDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const charge = await stripe.charges.retrieve(id);
        res.status(200).json(charge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transaction details' });
    }
  };
  
