const mongoose = require('mongoose');

const calçadoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'Nome inválido! O nome deve conter apenas caracteres alfabéticos.'
        }
    },
    size: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 37 && value <= 45;
            },
            message: 'Tamanho inválido! O tamanho deve estar entre 37 e 45.'
        }
    },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[A-Za-z]+$/.test(value);
            },
            message: 'Cor inválida! A cor deve conter apenas caracteres alfabéticos.'
        }
    },
    brand: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'Nome inválido! O nome deve conter apenas caracteres alfabéticos.'
        }
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'Preço inválido! O preço deve ser um número positivo.'
        }
    },
    quantity: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'Quantidade inválida! A quantidade deve ser um número positivo.'
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
        validate: {
            validator: function(value) {
                return mongoose.Types.ObjectId.isValid(value);
            },
            message: 'O id da categoria é inválido!'
        }
    },
})

module.exports = mongoose.model('Calçado', calçadoSchema);