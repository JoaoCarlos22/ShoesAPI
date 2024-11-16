const Calçado = require("../models/calcadoModel.js");

// Lista todos os calçados existentes no banco
const getCalçados = async (req, res) => {
    try{
        const calçados = await Calçado.find({});
        
        if (calçados.length > 0) {
            res.render('pages/home', {
              title: 'Home',
              style: 'home.css',
              shoes: calçados
            });
          } else {
            res.status(404).send('Calçados não encontrados!');
          }
    }catch(error){
        console.error('Erro ao buscar os calçados existentes:', error);
        res.status(500)
    }
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