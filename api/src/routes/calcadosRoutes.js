const express = require("express");
const router = express.Router();
const { getCalçados, createCalçado} = require("../controller/calcadosController.js");

// rotas para cada controle
router.get('/home', getCalçados);
router.post('/addCalcado', createCalçado);

/*
router.get("/calcado/:id", getCalcado);
router.post("/cadastrarCalcado", cadastrarCalcado);
router.put("/updateCalcado/:id", updateCalcado);
router.delete("/deleteCalcado/:id", deleteCalcado);
*/
module.exports = router;