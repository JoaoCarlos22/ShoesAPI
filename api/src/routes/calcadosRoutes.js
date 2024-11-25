const express = require("express");
const router = express.Router();
const { getCalçado, getCadastroCalçado, getCalçados, getUpdateCalçado, createCalçado, createCategory, updateCalçado, deleteCalçado} = require("../controller/calcadosController.js");
const { getCadastroFornecedor, getFornecedor, getUpdateFornecedor, updateFornecedor, deleteFornecedor} = require('../controller/fornecedorController.js')

// rotas para cada controle
router.get('/home', getCalçado);
router.get('/calcado/:id', getCalçado);
router.get('/addCalcado', getCadastroCalçado);
router.post('/addCalcado', createCalçado);
router.get('/updCalcado/:id', getUpdateCalçado);
router.post('/updCalcado/:id', updateCalçado);
router.post('/delCalcado/:id', deleteCalçado);
router.post('/addCategoria', createCategory);
router.post('/addFornecedor', )

module.exports = router;