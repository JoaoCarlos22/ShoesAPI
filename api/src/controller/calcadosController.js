const Calçado = require("../models/calcadoModel.js");
const Categoria = require("../models/categoriaModel.js");
const Fornecedor = require("../models/fornecedorModel.js");
const mongoose = require("mongoose");

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
            .populate({
                path: 'suppliers.supplier', // Popula o campo `supplier` dentro de `suppliers`
                select: 'name', // Seleciona apenas o nome do fornecedor
                model: Fornecedor
            });
        // Verifica se o calçado existe
        if (!calcado) {
            return res.status(404).send('Calçado não encontrado!');
        }

        // Renderiza a página /calcado/:id com os dados necessários
        res.render('pages/calcado/calcado', {
            title: `${calcado.name}`,
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
        // Certifica-se de que suppliers é um array
        const suppliersArray = Array.isArray(req.body.suppliers) ? req.body.suppliers : [req.body.suppliers];

        console.log("Array de suppliers recebido:", suppliersArray);

        // Processa cada fornecedor
        const processedSuppliers = suppliersArray.flatMap(supplierObj => {
            // Itera sobre as chaves do objeto (IDs dos fornecedores)
            return Object.keys(supplierObj).map(supplierId => {
                const { subtotal, subquantity } = supplierObj[supplierId]; // Extrai os dados do fornecedor

                // Validações
                if (!mongoose.Types.ObjectId.isValid(supplierId)) {
                    throw new Error(`ID do fornecedor inválido: ${supplierId}`);
                }

                const parsedSubquantity = parseInt(subquantity, 10);
                if (isNaN(parsedSubquantity) || parsedSubquantity < 0) {
                    throw new Error(`Subquantidade inválida: ${subquantity}`);
                }

                const parsedSubtotal = parseFloat(subtotal.replace('R$', '').trim());
                if (isNaN(parsedSubtotal) || parsedSubtotal < 0) {
                    throw new Error(`Subtotal inválido: ${subtotal}`);
                }

                // Retorna o fornecedor processado
                return {
                    supplier: supplierId,        // ID do fornecedor
                    subquantity: parsedSubquantity, // Subquantidade convertida
                    subtotal: parsedSubtotal        // Subtotal convertido
                };
            });
        });

    
        // Cria o novo calçado com os dados recebidos
        const newCalçado = new Calçado({
            name: req.body.name,
            gender: req.body.gender,
            size: req.body.size,
            color: req.body.color,
            category: req.body.category,
            brand: req.body.brand,
            suppliers: processedSuppliers,
            totalQuantity: req.body.quantity, // Total de subquantidades calculadas
            totalPrice: req.body.price, // Total de subtotais calculados
        });

        // Salva o calçado no banco de dados
        await newCalçado.save();
        res.redirect('/ShoesSystem/home'); // Redireciona após o sucesso
    } catch (error) {
        console.error('Erro ao registrar calçado:', error);
        res.status(500).send(error.message); // Retorna o erro ao cliente
    }
};

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
            shoe: calçado,
            suppliers: await Fornecedor.find({})
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

        // Certifica-se de que suppliers é um array
        const suppliersArray = Array.isArray(req.body.suppliers) ? req.body.suppliers : [req.body.suppliers];

        let lastTotalPrice = calçado.totalPrice || 0;
        console.log("Preço total atual:",lastTotalPrice);

        // verifica se há algum array (length diferente que zero)
        if (suppliersArray.length > 0) {
            console.log("Array de suppliers recebido:", suppliersArray);

            // Processa cada fornecedor
            const processedSuppliers = suppliersArray.flatMap(supplierObj => {
                // Itera sobre as chaves do objeto (IDs dos fornecedores)
                return Object.keys(supplierObj).map(supplierId => {
                    const { subtotal, subquantity } = supplierObj[supplierId]; // Extrai os dados do fornecedor

                    // Validações
                    if (!mongoose.Types.ObjectId.isValid(supplierId)) {
                        throw new Error(`ID do fornecedor inválido: ${supplierId}`);
                    }

                    const parsedSubquantity = parseInt(subquantity, 10);
                    if (isNaN(parsedSubquantity) || parsedSubquantity <= 0) { 
                        // Se subquantity não é válido ou é 0, ignora esse fornecedor
                        return null;
                    }

                    const parsedSubtotal = parseFloat(subtotal.replace('R$', '').trim());
                    if (isNaN(parsedSubtotal) || parsedSubtotal < 0) {
                        throw new Error(`Subtotal inválido: ${subtotal}`);
                    }

                    // Retorna o fornecedor processado
                    return {
                        supplier: supplierId,        // ID do fornecedor
                        subtotal: parsedSubtotal,        // Subtotal convertido
                        subquantity: parsedSubquantity // Subquantidade convertida
                    };
                });
            });
            // Atualiza a lista de fornecedores se houver pelo menos um válido
            if (processedSuppliers.length > 0) {
                calçado.suppliers = processedSuppliers;
            } else {
                calçado.suppliers = []; // Nenhum fornecedor com subquantity válida
                calçado.totalPrice = lastTotalPrice;
            };
        } else {
            // se não há fornecedores, remove todos os fornecedores
            calçado.suppliers = [];
            calçado.totalPrice = lastTotalPrice;
        }

        // atualiza os dados do calçado (quantidade e/ou preço)
        // se houver preço, ele atualiza
        if (req.body.price) {
            calçado.totalPrice = parseFloat(req.body.price.replace('R$', '').trim());
            console.log("Preço total (req.body):",calçado.totalPrice);
        }
        
        // se houver quantidade, ele atualiza
        if (req.body.quantity) {
            calçado.totalQuantity = parseInt(req.body.quantity, 10);
        }
        
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