const express = require("express");
const router = express.Router();
const { getCalçados, getCalçado, getCadastroCalçado, createCalçado, createCategory, getUpdateCalçado, updateCalçado, deleteCalçado} = require("../controller/calcadosController.js");

// rotas para cada controle
router.get('/home', getCalçados);
router.get('/calcado/:id', getCalçado);
router.get('/addCalcado', getCadastroCalçado);
router.post('/addCalcado', createCalçado);
router.get('/updCalcado/:id', getUpdateCalçado);
router.post('/updCalcado/:id', updateCalçado);
router.post('/delCalcado/:id', deleteCalçado);
router.post('/addCategoria', createCategory);

module.exports = router;