const Calçado = require("../models/calcadoModel.js");

// Lista todos os calçados existentes no banco
const getCalçados = async (req, res) => {
    Calçado.find().lean()
    .then(data => {
      res.render("pages/home", { shoes: data })
    })
    .catch(err =>
      console.log('Erro ao buscar os calçados existentes:', err))
}
    /*
    try{
        const calçados = await Calçado.find({});
        res.status(200).json(empresas)
    }catch(error){
        console.error('Erro ao buscar os calçados existentes:', error);
        res.status(500)
    }*/

 // Registra um novo calçado
const createCalçado = async (req, res) => {
    try{
        const newCalçado = new Calçado(req.body);
        await newCalçado.save();
        res.status(201).json(newCalçado)
    }catch(error){
        console.error('Erro ao registrar calçado:', error);
        res.status(500)
    }
}

module.exports = {
    getCalçados,
    createCalçado
}