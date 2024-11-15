const express = require("express");
const router = express.Router();
//const {getEmpresa, getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa} = require("../contrroller/empresaController");

// rotas para cada controle
router.get('/', (req, res) => {
    try{
        res.render("Home/home.html")
      }
      catch(e){
        console.log(`Error during fetching operation: ${e}\n`)
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