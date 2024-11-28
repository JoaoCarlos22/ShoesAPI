const mongoose = require('mongoose');

const calçadoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[A-Za-z\sáéíóúÁÉÍÓÇç]+$/.test(value);
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
                return /^[A-Za-z\sáéíóúÁÉÍÓÇç]+$/.test(value);
            },
            message: 'Cor inválida! A cor deve conter apenas caracteres alfabéticos.'
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
    brand: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[A-Za-z\sáéíóúÁÉÍÓÇç]+$/.test(value);
            },
            message: 'Marca inválida! A marca deve conter apenas caracteres alfabéticos.'
        }
    },
    // array de fornecedores, e para cada posicao do array terá a referencia de forncedor, subtotal e a subquantidade
    suppliers: [{
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fornecedor',
            required: true,
            validate: {
                validator: function(value) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'O id do fornecedor é inválido!'
            }
        },
        subtotal: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= 0;
                },
                message: 'Subtotal inválido! O subtotal deve ser um número positivo.'
            }
        },
        subquantity: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= 0;
                },
                message: 'Subquantidade inválida! A subquantidade deve ser um número positivo.'
            }
        }
    }],
    totalQuantity: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'Quantidade inválida! A quantidade deve ser um número positivo.'
        }
    },
    totalPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'Preço total inválido! O preço total deve ser um número positivo.'
        }
    }
});

module.exports = mongoose.model('Calçado', calçadoSchema);
