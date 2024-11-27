const express = require("express");
const router = express.Router();
const { getCalçado, getCadastroCalçado, getCalçados, getUpdateCalçado, createCalçado, createCategory, updateCalçado, deleteCalçado} = require("../controller/calcadosController.js");
const { getCadastroFornecedor, getFornecedor, createFornecedor, getUpdateFornecedor, updateFornecedor, deleteFornecedor, getFornecedores, getPrice} = require('../controller/fornecedorController.js')

// rotas para cada controle
router.get('/home', getCalçados);
router.get('/calcado/:id', getCalçado);
router.get('/addCalcado', getCadastroCalçado);
router.post('/addCalcado', createCalçado);
router.get('/updCalcado/:id', getUpdateCalçado);
router.post('/updCalcado/:id', updateCalçado);
router.post('/delCalcado/:id', deleteCalçado);

router.get('/fornecedores', getFornecedores);
router.get('/fornecedor/:id', getFornecedor);
router.get('/addFornecedor', getCadastroFornecedor);
router.post('/addFornecedor', createFornecedor);
router.post('/updFornecedor', updateFornecedor);
router.post('/delFornecedor', deleteFornecedor);

router.post('/addCategoria', createCategory);
// Rota para buscar o preço
router.get("/getPrice", getPrice);

module.exports = router;