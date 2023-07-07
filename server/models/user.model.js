const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minlength: [2, "Email must be at least 2 characters long"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [0, "Age must be at least 0"]
    },
    allowance: {
        type: Number,
    },
    chores: {
        type: Array,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    passwordConfirmation: {
        type: String,
    },
    typeOfAccount: {
        type: String,
        required: [true, "Type of account is required"],
    },
    
    familyAssigned: {
        type: String,
    }
        

}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);