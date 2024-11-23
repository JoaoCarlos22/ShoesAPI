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
    gender: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return ['masculino', 'feminino'].includes(value.toLowerCase());
            },
            message: 'Gênero inválido! O gênero deve ser "masculino" ou "feminino".'
        }
    },
    size: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 35 && value <= 45;
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
    supplier: [{
        id_fornecedor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fornecedor',
            validate: {
                validator: function(value) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'O id do fornecedor é inválido!'
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
        }
    }]
})

module.exports = mongoose.model('Calçado', calçadoSchema);