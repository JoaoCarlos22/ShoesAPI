const mongoose = require('mongoose');

const fornecedorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[A-Za-z\sáéíóúÁÉÍÓ��Çç]+$/.test(value);
            },
            message: 'Nome inválido! O nome deve conter apenas caracteres alfabéticos.'
        }  
    },
    cnpj:{
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(value) {
                return /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/.test(value);
            },
            message: 'CNPJ inválido! O CNPJ deve estar no formato XXX.XXX.XXX-XX.'
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Email inválido! O email deve estar no formato nome@domínio.com.'
        }
    },
    addres: {
        street: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    return /^[A-Za-z\sáéíóúÁÉÍÓ��Çç]+$/.test(value);
                },
                message: 'Logradouro inválido! O logradouro deve conter apenas caracteres alfabéticos.'
            }
        },
        number: {
            type: Number,
            unique: true,
            required: true,
            validate: {
                validator: function(value) {
                    return value > 0;
                },
                message: 'Número inválido! O número da casa deve ser um número positivo.'
            }
        },
        city: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    return /^[A-Za-z\sáéíóúÁÉÍÓ��Çç]+$/.test(value);
                },
                message: 'Cidade inválida! A cidade deve conter apenas caracteres alfabéticos.'
            }
        },
        state: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    return /^[A-Za-z]{2}$/.test(value);
                },
                message: 'Estado inválido! O estado deve conter duas letras (ex: SP).'
            }
        },
        country: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    return /^[A-Za-z\sáéíóúÁÉÍÓ��Çç]+$/.test(value);
                },
                message: 'País inválido! O país deve conter apenas caracteres alfabéticos.'
            }   
        }
    },
    catalog: [{
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
        brand: [{
            name:{
                required: true,
                validate: {
                    validator: function(value) {
                        return /^[A-Za-z\sáéíóúÁÉÍÓ��Çç]+$/.test(value);
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
                    message: 'Preço inválido! O preço do produto deve ser um número positivo.'
                }
            }
        }],
    }]
})

module.exports = mongoose.model('Fornecedor', fornecedorSchema);