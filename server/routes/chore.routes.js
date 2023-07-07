const ChoreController = require('../controllers/chore.controller');

module.exports = app => {
    app.get('/api/chores', ChoreController.getAllChores);
    app.post('/api/chores', ChoreController.createChore);
    app.get('/api/chores/:id', ChoreController.getOneChore);
    app.patch('/api/chores/:id', ChoreController.updateChore);
    app.delete('/api/chores/:id', ChoreController.deleteChore);
}