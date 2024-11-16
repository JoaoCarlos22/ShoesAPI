const Calçado = require("../models/calcadoModel.js");


const getCalçados = async (req, res) => {
    try{
        const calçados = await Calçado.find({});
        res.status(200).json(empresas)
    }catch(error){
        res.status(500).json({message: "Erro ao buscar os calçados existentes!"})
    }
}

