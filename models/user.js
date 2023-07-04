const mongoose = require('mongoose');

//build mongoose schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('user', userSchema);

