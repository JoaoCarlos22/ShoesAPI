const express = require("express");
const router = express.Router();
const { getCalçados, getCalçado, createCalçado, updateCalçado, deleteCalçado} = require("../controller/calcadosController.js");

// rotas para cada controle
router.get('/home', getCalçados);
router.get('/calcado/:id', getCalçado);
router.post('/addCalcado', createCalçado);
router.put('/updCalcado/:id', updateCalçado);
router.delete('/delCalcado/:id', deleteCalçado);

module.exports = router;