const Booking = require('../Models/consult.model');

exports.createBooking = async (req, res) => {
    const bookingData = req.body;

    const booking = new Booking(bookingData);

    try {
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create booking', error: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).send();
        }
        res.send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!booking) {
            return res.status(404).send();
        }
        res.send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteBooking = async (req, res) => {
    const id = req.params.id;
    try {
        const booking = await Booking.findOneAndDelete({ _id: id });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.updateBookings = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['isUserComplete', 'isDocComplete'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).send();
        }

        updates.forEach(update => booking[update] = req.body[update]);
        
        if (booking.isUserComplete && booking.isDocComplete) {
            booking.forAdmin = true;
        }

        await booking.save();
        res.status(200).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
};