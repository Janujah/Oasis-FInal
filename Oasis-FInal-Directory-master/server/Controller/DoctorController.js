
const multer = require('multer');
const Doctor = require('../Models/Doctor.model');
const { uploaded } = require('../utils/multer'); // Import the Cloudinary multer configuration
const { v4: uuidv4 } = require('uuid');

// Create a new user
exports.createUser = async (req, res) => {
    uploaded(
        req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while uploading the image.');
        }

        const {             
            fullName,
            position,
            email,
            bio,
            registeredId,
            workingHospitals,
            fees,
            accountNo,
            age,
            contactNo,
            availability 
        } = req.body;
        
        try {
            let profileImage = null;
            if (req.file) {
                // Since you're using Cloudinary for image upload, you don't need `uploader.upload`
                // CloudinaryStorage already handles the upload process
                profileImage = req.file.path; // Assuming CloudinaryStorage returns the path of the uploaded image
            }
            const parsedAvailability = JSON.parse(availability);

            const doctor = new Doctor({
                fullName,
                position,
                email,
                bio,
                registeredId,
                workingHospitals,
                fees,
                accountNo,
                age,
                contactNo,
                availability: parsedAvailability, // Use the parsed availability data
                profileImage,
            });

            await doctor.save();
            res.json({ doctor });
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while saving the doctor profile.');
        }
    });
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        if (doctors.length > 0) {
            // Map each doctor to include the Cloudinary image URL
            const doctorsWithImages = doctors.map(doctor => {
                return {
                    ...doctor._doc, // Include all existing doctor fields
                    profileImage: doctor.profileImage // Assuming profileImage stores the Cloudinary URL
                };
            });
            res.status(200).json(doctorsWithImages);
        } else {
            res.status(404).send('No doctors found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving the doctors.');
    }
};

// Get a user by ID
exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id; // Assume the user ID is passed as a URL parameter
        const user = await Doctor.findById(userId); // Ensure this matches the model name

        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving the user.');
    }
};


// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) {
            // Upload new profile image to Cloudinary
            const result = await Cloudinary.uploader.upload(req.file.path, {
                folder: 'doctors',
                public_id: `sheet_${Date.now()}`,
            });
            updates.profileImage = {
                public_id: result.public_id,
                url: result.url,
            };
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor', error });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting doctor', error });
    }
};

// Patch users (verify)
exports.patchUsers = async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { $set: { isVerified: true } },
            { new: true, runValidators: true }
        );
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'No doctor found with that ID' });
        }
        res.status(200).json({ message: 'Doctor verified successfully', doctor: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Error during verification and fetch', error });
    }
};
