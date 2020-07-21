const mongoose = require('mongoose');
const Notes = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    body:{
        type: String,
        required: true
    }
},
{timestamps:true}
)

module.exports = mongoose.model('Notes',Notes);