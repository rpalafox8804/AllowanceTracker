const mongoose = require('mongoose');


const ChoreSchema = new mongoose.Schema({

    title: {
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
    adultAssigned: {
        type: String,
        required: [true, "Adult assigned is required"],
    },
    note: {
        type: String
        
    },
    choreID: {
        type: Number
    }

}, {timestamps: true});

const Chore = mongoose.model("Chore", ChoreSchema);
module.exports = Chore;
