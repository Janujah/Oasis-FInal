const Mongoose = require('mongoose');
const schema = new Mongoose.Schema ({
    email:{
        type:String,
        // require: true
    },
    password:{
        type:String,
        // require: true
    },   
    userName:{
        type:String
    },
    Role:{
        type:String,
        enum: ['consumers', 'Doctor', 'Ortho_technician', 'Admin']  
    },
    phoneNumber:{
        type:String,
        required: true
    }
},
{ timestamps: true }
);

const NormalUser = Mongoose.model('Users',schema);
module.exports = NormalUser;