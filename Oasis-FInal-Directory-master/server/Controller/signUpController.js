const User = require('../Models/Signupmodel');
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
    try {
        const { userName,Role , email, password ,phoneNumber} = req.body;        
        bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.create({ userName, email, Role, password: hash, phoneNumber })
            .then((Farmers) => res.json(Farmers))
            .catch((err) => res.json(err));
        });
        // res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params.id
        const user = await User.findById(id);
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
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        const user = await User.findOneAndDelete({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

