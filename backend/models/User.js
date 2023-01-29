const mongoose = require("mongoose");

// Destructuring
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    location:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserSchema)
// 'user' named collection will be created
// whem we import model is imported and crud operation is performed, it's a wrapper for your schema as well as way fro connection with mongodb