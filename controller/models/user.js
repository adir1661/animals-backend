const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        type: String, unique: true, required: true
    },
    name: { type: String, default: '' },
    username: { type: String },
    hash: { type: String, required: true },
    birth: Date,
    last: { type: String, default: '' },
})

const User = mongoose.model('User', userSchema);

module.exports = User;