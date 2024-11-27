const Fornecedor = require('../models/fornecedorModel');
const Categoria = require('../models/categoriaModel');

// Rota para renderizar a página de todos os fornecedores existentes
exports.getFornecedores = async (req, res) => {
    try {
        // Busca todos os fornecedores no banco de dados
        const fornecedores = await Fornecedor.find({}).populate('address');

        // verifica se existe algum fornecedor no banco de dados
        if (!fornecedores.length) {
            return res.status(404).send('Nenhum fornecedor encontrado!');
        }

        // Renderiza a página com a lista de fornecedores
        res.render('pages/fornecedor/fornecedores', {
            title: 'Fornecedores',
            style: 'fornecedores.css',
            suppliers: fornecedores,
        });
    } catch (error) {
        console.error('Erro ao buscar os fornecedores:', error);
        res.status(500).send(error.message);
    }
};

// Rota para renderizar a página de um fornecedor específico
exports.getFornecedor = async (req, res) => {
    try {
        // Busca o fornecedor pelo ID
        const fornecedor = await Fornecedor.findById(req.params.id).populate('catalog.category');

        // Verifica se o fornecedor existe
        if (!fornecedor) {
            return res.status(404).send('Fornecedor não encontrado!');
        }

        // Renderiza a página com os dados do fornecedor
        res.render('pages/fornecedor/fornecedor', {
            title: `Fornecedor: ${fornecedor.name}`,
            style: 'fornecedor.css',
            supplier: fornecedor,
            categories: await Categoria.find({})
        });
    } catch (error) {
        console.error('Erro ao buscar o fornecedor:', error);
        res.status(500).send(error.message);
    }
};

// Rota para renderizar a página de criação de um novo fornecedor
exports.getCadastroFornecedor = (req, res) => {
    res.render('pages/addFornecedor', {
        title: 'Cadastrar Fornecedor',
        style: 'addFornecedor.css',
    });
};

// Rota para salvar um novo fornecedor no banco de dados
exports.createFornecedor = async (req, res) => {
    try {
        // Cria um novo fornecedor com os dados recebidos
        const fornecedor = new Fornecedor({
            name: req.body.name,
            cnpj: req.body.cnpj,
            email: req.body.email,
            address: req.body.address,
            catalog: req.body.catalog
        });

        // verifica se há alguma duplicata pelo cnpj
        const fornecedorExiste = await Fornecedor.findOne({ cnpj: fornecedor.cnpj });
        if (fornecedorExiste) {
            return res.status(409).send('Fornecedor já existe!');
        }

        // Salva o novo fornecedor no banco de dados
        await fornecedor.save();

        // Volta para a Home
        res.redirect('/ShoesSystem/home');
    } catch (error) {
        console.error('Erro ao cadastrar o fornecedor:', error);
        res.status(400).send(error.message);
    }
};

// Rota para renderizar a página de edição de um fornecedor existente
exports.getUpdateFornecedor = async (req, res) => {
    try {
        // Busca o fornecedor pelo ID
        const fornecedor = await Fornecedor.findById(req.params.id);

        // Verifica se o fornecedor existe
        if (!fornecedor) {
            return res.status(404).send('Fornecedor não encontrado!');
        }

        // Renderiza a página com os dados do fornecedor
        res.render('pages/updFornecedor', {
            title: `Editar Fornecedor: ${fornecedor.nome}`,
            style: 'updFornecedor.css',
            supplier: fornecedor,
        });
    } catch (error) {
        console.error('Erro ao buscar o fornecedor:', error);
        res.status(500).send(error.message);
    }
};

// Rota para atualizar um fornecedor existente
exports.updateFornecedor = async (req, res) => {
    try{
        // Busca o fornecedor pelo ID
        const fornecedor = await Fornecedor.findByIdAndUpdate(req.params.id);

        // Verifica se o fornecedor existe
        if (!fornecedor) {
            return res.status(404).send('Fornecedor não encontrado!');
        }

        // Atualiza os dados do fornecedor
        fornecedor.name = req.body.name;
        fornecedor.cnpj = req.body.cnpj;
        fornecedor.address = req.body.address;

        // Salva os dados do fornecedor
        await fornecedor.save();
        
        // Volta para a Home
        res.redirect('/ShoesSystem/home');
    } catch (error) {
        console.error('Erro ao atualizar o fornecedor:', error);
        res.status(500).send(error.message);
    }
};

// Rota para deletar um fornecedor existente
exports.deleteFornecedor = async (req, res) => {
    try {
        // Busca o fornecedor pelo ID
        const fornecedor = await Fornecedor.findByIdAndDelete(req.params.id);

        // Verifica se o fornecedor existe
        if (!fornecedor) {
            return res.status(404).send('Fornecedor não encontrado!');
        }

        // Volta para a Home
        res.redirect('/ShoesSystem/home');
    } catch (error) {
        console.error('Erro ao deletar o fornecedor:', error);
        res.status(500).send(error.message);
    }
};

// Endpoint para buscar o preço do calçado com base no fornecedor, categoria e marca
exports.getPrice = async (req, res) => {
    try {
        const { supplier, category, brand } = req.query;

        console.log("Parâmetros recebidos:", { supplier, category, brand });

        // Verifica se todos os parâmetros foram fornecidos
        if (!supplier || !category || !brand) {
            return res.status(400).json({ message: "Parâmetros inválidos" });
        }

        // Busca o fornecedor no banco de dados
        const fornecedor = await Fornecedor.findById(supplier).populate("catalog.category");

        if (!fornecedor) {
            return res.status(404).json({ message: "Fornecedor não encontrado" });
        }

        // Procura a categoria correspondente no catálogo do fornecedor
        const catalogItem = fornecedor.catalog.find(
            (item) => item.category._id.toString() === category
        );

        if (!catalogItem) {
            return res.status(404).json({ message: "Categoria não encontrada no catálogo do fornecedor" });
        }

        // Procura a marca dentro da categoria
        const brandItem = catalogItem.brand.find((item) => item.name === brand);

        if (!brandItem) {
            return res.status(404).json({ message: "Marca não encontrada na categoria" });
        }

        // Retorna o preço
        res.json({ price: brandItem.price });
    } catch (error) {
        console.error("Erro ao buscar preço:", error);
        res.status(500).json({ message: "Erro ao buscar preço" });
    }
};

