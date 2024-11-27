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
exports.getPrices = async (req, res) => {
    try {
        const { category, brand } = req.query;

        console.log("Parâmetros recebidos:", { category, brand });

        // Validação de parâmetros
        if (!category || !brand) {
            return res.status(400).json({ message: "Parâmetros inválidos. Certifique-se de fornecer a categoria e a marca." });
        }

        // Busca todos os fornecedores que possuem a categoria no catálogo
        const fornecedores = await Fornecedor.find({
            "catalog.category": category, // Filtra fornecedores com a categoria no catálogo
            "catalog.brand.name": brand  // Filtra fornecedores com a marca no catálogo
        }).populate("catalog.category"); // Popula a referência da categoria para ter mais informações, se necessário

        if (!fornecedores.length) {
            return res.status(404).json({ message: "Nenhum fornecedor encontrado para a categoria e marca especificadas." });
        }

        // Monta o objeto com preços de cada fornecedor
        const prices = fornecedores.map((fornecedor) => {
            const catalogItem = fornecedor.catalog.find(
                (item) => item.category._id.toString() === category // Procura o item correspondente na categoria
            );

            if (catalogItem) {
                const brandItem = catalogItem.brand.find(
                    (item) => item.name.toLowerCase() === brand.toLowerCase() // Procura a marca correspondente
                );

                if (brandItem) {
                    return {
                        supplierId: fornecedor._id,
                        supplierName: fornecedor.name,
                        price: brandItem.price,
                    };
                }
            }
            return null; // Ignora caso não encontre um preço válido
        }).filter(item => item !== null); // Remove itens nulos do resultado

        console.log('Prices: ', prices)

        if (!prices.length) {
            return res.status(404).json({ message: "Nenhuma correspondência encontrada para a categoria e marca especificadas." });
        }

        // Retorna os preços encontrados
        res.json(prices);
    } catch (error) {
        console.error("Erro ao buscar preços:", error);
        res.status(500).json({ message: "Erro interno ao buscar preços." });
    }
};
