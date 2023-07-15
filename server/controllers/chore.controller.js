const mongoose = require('mongoose');
const Chore = require("../models/chore.model");

module.exports = {
    // CREATE
    createChore: (req, res) => {
        Chore.create(req.body)
            .then(newChore => res.json(newChore))
            .catch(err => res.status(400).json(err));
    },

    // READ
    getAllChores: (req, res) => {
        Chore.find()
            .then(allChores => res.json(allChores))
            .catch(err => res.json(err));
    },
    // FIND ONE
    getOneChore: (req, res) => {
        Chore.findById(req.params.id)
            .then(oneChore => res.json(oneChore))
            .catch(err => res.json(err));
    },
    //UPDATE
    updateChore: (req, res) => {
        Chore.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
            .then(updatedChore => res.json(updatedChore))
            .catch(err => res.status(400).json(err));
    },
    // DELETE
    deleteChore: (req, res) => {
        Chore.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },
    // get children with chores that are addigned to adults
    getChildrenByAdult: (req, res) => {
        Chore.find({adultAssigned: req.params.adultAssigned})
            .then(children => res.json(children))
            .catch(err => res.json(err));
    },
    //get all chores for a child
    getChoresByChild: (req, res) => {
        Chore.find({childAssigned: req.params.childAssigned})
            .then(chores => res.json(chores))
            .catch(err => res.json(err));
    }
}