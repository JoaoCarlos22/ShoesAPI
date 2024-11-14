const express = require("express");
const router = express.Router();
//const {getEmpresa, getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa} = require("../contrroller/empresaController");

// rotas para cada controle
router.get('/calcados', getCalcados);
router.get("/calcado/:id", getCalcado);
router.post("/cadastrarCalcado", cadastrarCalcado);
router.put("/updateCalcado/:id", updateCalcado);
router.delete("/deleteCalcado/:id", deleteCalcado);

module.exports = router;