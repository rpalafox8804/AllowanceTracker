const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
const ChoreController = require('../controllers/chore.controller');


module.exports = app => {
    app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/email/:email', UserController.findOneByEmail);
    app.get('/api/users/id/:id', UserController.findOneSingleUser);
    app.get('/api/users/adult', UserController.findAllAdults);
    app.get('/api/users/child', UserController.findAllChildren);
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.post('/api/logout', UserController.logout);

 }
