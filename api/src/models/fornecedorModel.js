const mongoose = require('mongoose');

const fornecedorSchema = mongoose.Schema({
    brand: [{
        name: {

        },
        price: {
        },
    }]
})

module.exports = mongoose.model('Fornecedor', fornecedorSchema);