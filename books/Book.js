const mongoose = require('mongoose');

mongoose.model('Book', {
    // title, author, numberPages, publisher
    title: {
        type: String,
        require: true
    },
    author: {
        type: String, 
        require: true
    },
    numberPages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false
    }
});
exports = module.exports = mongoose.model('Book');