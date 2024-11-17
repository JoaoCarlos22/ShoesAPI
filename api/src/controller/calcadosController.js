const Calçado = require("../models/calcadoModel.js");
const Categoria = require("../models/categoriaModel.js");

// Lista todos os calçados existentes no banco
const getCalçados = async (req, res) => {
    try{
        // busca todos os calçados no banco de dados com find() e retorna um array de calçados e exibe o nome da categoria inves do id
        const calçados = await Calçado.find({})
       //.populate('category')   
        
        // verifica se há algum calçado
        if (calçados.length > 0) {
            res.render('pages/home', {
              title: 'Home',
              style: 'home.css',
              shoes: calçados
            });
          } else {
            res.status(404).send('Banco de dados vazio!');
          }
    }catch(error){
        console.error('Erro ao buscar os calçados existentes:', error);
        res.status(500).send(error.message)
    }
}

// Busca apenas um calçado
const getCalçado = async (req, res) => {
    try{
        // busca o calçado pelo id no banco de dados com findById()
        const calçado = await Calçado.findById(req.params.id)
        
        // verifica se o calçado existe
        if (!calçado) {
            return res.status(404).send('Calçado não encontrado!');
        }

        // renderiza para rota /calcado:id
        res.render('pages/calcado', {
            title: 'Calçado',
            style: 'calcado.css',
            shoe: calçado
        });
    } catch (error) {
        console.error('Erro ao buscar o calçado:', error);
        res.status(500).send(error.message);
    }
} 

// Registra um novo calçado
const createCalçado = async (req, res) => {
    try{
        // captura os dados do req.body
        const newCalçado = new Calçado(req.body);
        
        // verifica se o id da categoria existe
        const categoryExiste = await Categoria.findById(req.body.idCategory);
        if (!categoryExiste) {
            return res.status(404).send('Categoria não encontrada!');
        }    
        
        // verifica se há alguma duplicata pelo nome
        const calçadoExiste = await Calçado.findOne({ name: newCalçado.name });
        if (calçadoExiste) {
            return res.status(409).send('Calçado já existe!');
        }
        
        // cadastra o calçado e volta para a Home
        await newCalçado.save();
        res.redirect('/home');
    }catch(error){
        console.error('Erro ao registrar calçado:', error);
        res.status(500).send(error.message);
    }
}

// Registra uma categoria
 const createCategory = async (req, res) => {
    try{
        // captura os dados do req.body
        const newCategory = new Categoria(req.body);
        
        // verifica se há alguma duplicata pelo nome
        const categoryExiste = await Categoria.findOne({ name: newCategory.name });
        if (categoryExiste) {
            return res.status(409).send('Categoria já existe!');
        }
        
        // verifica se os dados são válidos
        if (newCategory.name === " ") {
            return res.status(400).send('Por favor, preencha o nome da categoria!');
        }
        
        // cadastra a categoria e volta para a Home
        await newCategory.save();
        res.redirect('/home');
    } catch (error) {
        console.error('Erro ao registrar a categoria:', error);
        res.status(500).send(error.message);
    }
 }
// Atualiza um calçado
const updateCalçado = async (req, res) => {
    try{
        // busca o calçado pelo id no banco de dados com findById()
        const calçado = await Calçado.findById(req.params.id)
        
        // verifica se o calçado existe
        if (!calçado) {
            return res.status(404).send('Calçado não encontrado!');
        }  
        
        // atualiza os dados do calçado (quantidade e/ou preço)
        calçado.quantity = req.body.quantity;
        calçado.price = req.body.price;
        
        // salva os dados do calçado e volta para a Home
        await calçado.save();
        res.redirect('/home');
    } catch (error) {
        console.error('Erro ao atualizar o calçado:', error);
        res.status(500).send(error.message);
    }
}

// Deleta um calçado
const deleteCalçado = async (req, res) => {
    try{
        // verifica se o id existe
        if (!req.params.id) {
            return res.status(404).send('Calçado não encontrado!');
        }

        // busca o calçado pelo id no banco de dados com findByIdAndDelete()
        await Calçado.findByIdAndDelete(req.params.id)
        
        // volta para a Home
        res.redirect('/home');
    } catch (error) {
        console.error('Erro ao deletar o calçado:', error);
        res.status(500).send(error.message);
    }
}

module.exports = {
    getCalçados,
    getCalçado,
    createCalçado,
    createCategory,
    updateCalçado,
    deleteCalçado
}