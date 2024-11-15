const express = require("express");
const router = express.Router();
//const {getEmpresa, getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa} = require("../contrroller/empresaController");

// rotas para cada controle
router.get('/', (req, res) => {
    try{
      res.render('pages/home', {
        title: 'Home',
        style: 'home.css' 
      })} catch(e){
        console.log(`Erro ao renderizar para a página Home: ${e}\n`)
      }
});

/*
router.get('/calcados', getCalcados);
router.get("/calcado/:id", getCalcado);
router.post("/cadastrarCalcado", cadastrarCalcado);
router.put("/updateCalcado/:id", updateCalcado);
router.delete("/deleteCalcado/:id", deleteCalcado);
*/
module.exports = router;