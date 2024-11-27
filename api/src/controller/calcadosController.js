const Calçado = require("../models/calcadoModel.js");
const Categoria = require("../models/categoriaModel.js");
const Fornecedor = require("../models/fornecedorModel.js");

// Lista todos os calçados existentes no banco
exports.getCalçados = async (req, res) => {
    try{
        // busca todos os calçados no banco de dados com find() e retorna um array de calçados e exibe o nome da categoria inves do id
        const calçados = await Calçado.find({})
        .populate('category', 'name');
        res.render('pages/home', {
            title: 'Home',
            style: 'home.css',
            //js: 'home.js',
            shoes: calçados
        });
    }catch(error){
        console.error('Erro ao buscar os calçados existentes:', error);
        res.status(500).send(error.message)
    }
}

// Busca apenas um calçado
exports.getCalçado = async (req, res) => {
    try {
        // Busca o calçado pelo ID e popula as informações de categoria e fornecedor
        const calcado = await Calçado.findById(req.params.id)
            .populate('category') // Popula a categoria
           // .populate('supplier'); // Popula o fornecedor

        // Verifica se o calçado existe
        if (!calcado) {
            return res.status(404).send('Calçado não encontrado!');
        }

        // Renderiza a página /calcado/:id com os dados necessários
        res.render('pages/calcado/calcado', {
            title: `Calçado ${calcado.name}`,
            style: 'calcado.css',
            shoe: calcado,
        });
    } catch (error) {
        console.error('Erro ao buscar o calçado:', error);
        res.status(500).send(error.message);
    }
} 

// Renderiza a página para cadastro de um novo calçado
exports.getCadastroCalçado = async (req, res) => {
    
    // renderiza a página com os dados do novo calçado e com as categorias e fornecedores
    res.render('pages/calcado/addCalcado', {
        title: 'Adicionar Calçado',
        style: 'addCalcado.css',
        categories: await Categoria.find({}),
        suppliers: await Fornecedor.find({})
    })
}

exports.createCalçado = async (req, res) => {
    try {
        const suppliers = req.body.suppliers || []; // Captura os fornecedores passados
        const quantity = req.body.quantity; // Captura a quantidade

        const newCalçado = new Calçado({
            name: req.body.name,
            gender: req.body.gender,
            size: req.body.size,
            color: req.body.color,
            brand: req.body.brand,
            category: req.body.category,
            supplier: suppliers, // Fornecedores
            quantity: quantity,
            totalPrice: req.body.price, // Preço total calculado
        });

        await newCalçado.save();
        res.redirect('/ShoesSystem/home');
    } catch (error) {
        console.error('Erro ao registrar calçado:', error);
        res.status(500).send(error.message);
    }
}

// Registra uma categoria
exports.createCategory = async (req, res) => {
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
        res.redirect('/ShoesSystem/home');
    } catch (error) {
        console.error('Erro ao registrar a categoria:', error);
        res.status(500).send(error.message);
    }
}

// Renderiza a página para atualizar um calçado
exports.getUpdateCalçado = async (req, res) => {
    try{
        // busca o calçado pelo id no banco de dados com findById()
        const calçado = await Calçado.findById(req.params.id).populate('category')
        
        // verifica se o calçado existe
        if (!calçado) {
            return res.status(404).send('Calçado não encontrado!');
        }

        // renderiza para rota /calcado:id
        res.render('pages/calcado/updCalcado', {
            title: 'Atualizar calçado',
            style: 'updCalcado.css',
            //js: 'btn-delete.js',
            shoe: calçado
        });
    } catch (error) {
        console.error('Erro ao buscar o calçado:', error);
        res.status(500).send(error.message);
    }
} 
 
// Atualiza um calçado
exports.updateCalçado = async (req, res) => {
    try{
        // busca o calçado pelo id no banco de dados com findById()
        const calçado = await Calçado.findById(req.params.id)
        
        // verifica se o calçado existe
        if (!calçado) {
            return res.status(404).send('Calçado não encontrado!');
        }  
        
        // atualiza os dados do calçado (quantidade e/ou preço)
        calçado.totalPrice = req.body.price;
        calçado.quantity = req.body.quantity;
        
        // salva os dados do calçado e volta para a Home
        await calçado.save();
        res.redirect('/ShoesSystem/home');
    } catch (error) {
        console.error('Erro ao atualizar o calçado:', error);
        res.status(500).send(error.message);
    }
}

// Deleta um calçado
exports.deleteCalçado = async (req, res) => {
    try{
        // verifica se o id existe
        if (!req.params.id) {
            return res.status(404).send('Calçado não encontrado!');
        }

        // busca o calçado pelo id no banco de dados com findByIdAndDelete()
        await Calçado.findByIdAndDelete(req.params.id)
        
        // volta para a Home
        res.redirect('/ShoesSystem/home');
    } catch (error) {
        console.error('Erro ao deletar o calçado:', error);
        res.status(500).send(error.message);
    }
}