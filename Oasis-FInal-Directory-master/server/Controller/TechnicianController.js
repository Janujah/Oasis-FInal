const Tech = require('../Models/Technician.model');

exports.createUser = async (req, res) => {
    try {
        const user = new Tech(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Tech.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await Tech.findById(req.params.email);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await Tech.findByIdAndUpdate(req.params.email, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Tech.findOneAndDelete({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
