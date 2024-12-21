
const Mongoose = require('mongoose');
const schema = new Mongoose.Schema ({
    fullName:{
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
    email:{
        type:String,
        // require: true
    },
    password:{
        type:String,
        // require: true
    },
    place:{
        type:String,
        // require: true
    },
    position:{
        type:String
    },
    registeredId:{
        type:String
    }
});
const Tech = Mongoose.model('Technicians',schema);
module.exports = Tech;