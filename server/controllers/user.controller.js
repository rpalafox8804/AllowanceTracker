const User = require("../models/user.model");
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    //register a user
    register: async (req, res) => {
        try {
            const potentialUser = await User.findOne({ email: req.body.email });
            if (potentialUser) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }
            const newUser = await User.create(req.body);
            const userToken = jwt.sign({ _id: newUser._id, email: newUser.email }, secret, { expiresIn: "2h" });
            res.cookie("usertoken", userToken, secret, { httpOnly: true }).json({
                message: "Successfully registered",
                user: newUser
            });

        }
        catch (err) {
            return res.status(400).json(err);
        }
    },
    //login a user
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const passwordMatch = await bcrypt.compare(req.body.password, user.password);
                if (passwordMatch) {
                    const userToken = jwt.sign({
                        id: user._id,
                        email: user.email
                    }, secret, { expiresIn: "2h" });
                    res.cookie("usertoken", userToken, secret, { httpOnly: true }).json({ msg: "Success!", user: user });
                }
                else {
                    res.status(400).json({ msg: "Invalid login attempt" });
                }
            }
            else {
                res.status(400).json({ msg: "Invalid login attempt" });
            }
        }
        catch (err) {
            res.status(400).json(err);
        }
    },

    //logout
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },
    //get all users
    findAllUsers: (req, res) => {
        User.find()
            .then(allUsers => res.json({ users: allUsers }))
            .catch(err => res.json({ message: "Something went wrong", error: err }));
    },
    //get all users of type child or adult
    findAllChildren: (req, res) => {
        User.find({ typeOfAccount: 'Child' })
            .then(allUsers => res.json({ users: allUsers }))
            .catch(err => res.json({ message: "Something went wrong", error: err }));
    },
    //get all users of type adult
    findAllAdults: (req, res) => {
        User.find({ typeOfAccount: "Adult" })
            .then(allUsers => res.json({ users: allUsers }))
            .catch(err => res.json({ message: "Something went wrong", error: err }));
    },
    //get one user
    findOneSingleUser: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then(oneSingleUser => res.json({ user: oneSingleUser }))
            .catch(err => res.json({ message: "Something went wrong", error: err }));
    },
    //get one user by email
    findOneByEmail: (req, res) => {
        User.findOne({ email: req.params.email })
            .then(oneSingleUser => res.json({ user: oneSingleUser }))
            .catch(err => res.json({ message: "Something went wrong", error: err }));
    }


}