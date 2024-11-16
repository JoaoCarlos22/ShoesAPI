const mongoose = require('mongoose');

const calçadoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    idCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    },
})

module.exports = mongoose.model('Calçado', calçadoSchema);