const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    address_line_1: {
        type: String,
        required: true
    },
    address_line_2: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('users', UserSchema);
