const Notes = require('../models/Notes');

exports.addNote = (req,res) => {
    const createNote = new Notes(req.body);
    createNote.save((err,data)=>{
        if(err){
            return res.status(400).json({
                err: `unable to save the data because of this ${err}`
            })
        }
        res.json({data})
    });
}

exports.getAllNotes = (req,res) =>  {
    Notes.find().exec((err,data)=>{
        if(err){
            return res.status(400).json({
                err: `unable to save the data because of this ${err}`
            })
        }
        res.json({data})
    })
}

exports.noteId = (req,res,next,id) => {
    Notes.findById(id).exec((err,note)=>{
        if(err || !note){
            return res.status(400).json({
                err: `unable to save the data because of this ${err}`
            })
        }
        req.note = note; 
            next(); 
    })
}

exports.getById = (req,res) => {
    return res.json(req.note)
}

exports.updateById = (req,res) => {
    const note = req.note;
    note.title = req.body.title;
    note.body = req.body.body;
    note.save((err,updatedValues)=>{
        if(err || !updatedValues){
            return res.status(400).json({
                err: `unable to save the data because of this ${err}`
            })
        }
        res.json({updatedValues})
    })
}

exports.deleteById = (req,res)=>{
    let note = req.note;
    note.remove((err,deletedItem)=>{
        if(err || !deletedItem){
            return res.status(400).json({
                err: `unable to save the data because of this ${err}`
            })
        }else {
            res.status(200).json({
                msg:'following item deleted successfully',
                deletedItem
            })
        }
        
    })
}