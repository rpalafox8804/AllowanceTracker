const mongoose = require('mongoose');

const ChoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters long"]
    },
    childAssigned: {
        type: String,
        required: [true, "Child assigned is required"],
    },
    choreAllowanceValue: {
        type: Number,
        required: [true, "Chore allowance value is required"],
        min: [0, "Chore allowance value must be at least 0"]
    },
    note: {
        type: String,
        
    }

}, {timestamps: true});

module.exports = mongoose.model("Chore", ChoreSchema);
