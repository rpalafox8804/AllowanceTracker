const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be at least 2 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name must be at least 2 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minlength: [2, "Email must be at least 2 characters long"],
        unique: [true, 'Email already exists'],
        validate: [isEmail, 'Please enter a valid email']
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
    typeOfAccount: {
        type: String,
        required: [true, "Type of account is required"],
    },

    familyAssigned: {
        type: String,
    }
        

}, {timestamps: true});

//Middleware to create virtual field for password confirmation
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

//validates password matches confirmed password
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});
// Middleware to hash password
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});
module.exports = mongoose.model("User", UserSchema);
