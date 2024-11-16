const Calçado = require("../models/calcadoModel.js");

// Lista todos os calçados existentes no banco
const getCalçados = async (req, res) => {
    try{
        // busca todos os calçados no banco de dados com find() e retorna um array de calçados
        const calçados = await Calçado.find({})
        
        // verifica se há algum calçado
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

 // Registra um novo calçado
const createCalçado = async (req, res) => {
    try{
        // captura os dados do req.body
        const newCalçado = new Calçado(req.body);
        
        // verifica se o id da categoria existe
        const categoryExiste = await Categoria.findById(newCalçado.idCategory);
        if (!categoryExiste) {
            return res.status(404).send('Categoria não encontrada!');
        }    
        
        // verifica se há alguma duplicata pelo nome
        const calçadoExiste = await Calçado.findOne({ name: newCalçado.name });
        if (calçadoExiste) {
            return res.status(409).send('Calçado já existe!');
        }

        // verifica se os dados são válidos
        if (!newCalçado.isValid()) {
            return res.status(400).send('Por favor, preencha todos os campos corretamente!');
        }
        
        // cadastra o calçado e volta para a Home
        await newCalçado.save();
        res.redirect('/home');
    }catch(error){
        console.error('Erro ao registrar calçado:', error);
        res.status(500)
    }
}

module.exports = {
    getCalçados,
    createCalçado
}