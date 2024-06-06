const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
},
    { timestamps: true });


const userCredentials = mongoose.model('userCredentials', userSchema);
module.exports = userCredentials;