const Mongoose = require('mongoose');
const schema = new Mongoose.Schema ({
    fullName:{
        type:String,
        // require: true
    },
    email:{
        type:String,
        // require: true
    },
    Age:{
        type:Number,
        // require: true
    },   
    userName:{
        type:String
    },
    password:{
        type:String,
        // require: true
    },
    residence:{
        type:String,
        // require: true
    }
});

const NormalUser = Mongoose.model('Normal-Users',schema);
module.exports = NormalUser;