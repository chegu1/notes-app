const createNote = require('../controllers/notes');
const Notes = require('../models/Notes');

module.exports = (app) => {
    app.route('/create')
        .post(
            createNote.addNote
        )
    app.route('/getall')
        .get(
            createNote.getAllNotes
        )
    app.route('/get/:id')
        .get(
            createNote.getById
        )
        .delete(
            createNote.deleteById
        )
        .put(
            createNote.updateById
        )
        
    app.param('id', createNote.noteId)
}