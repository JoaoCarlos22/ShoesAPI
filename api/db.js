const mongoose =require('mongoose')

const dbUri = "mongodb://localhost:27017/CalçadosDB"

module.exports = () => mongoose.connect(dbUri)