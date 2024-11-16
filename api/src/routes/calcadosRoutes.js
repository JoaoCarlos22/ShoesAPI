const express = require("express");
const router = express.Router();
const { getCalçados, createCalçado} = require("../controller/calcadosController.js");

// rotas para cada controle
router.get('/home', (req, res) => {
    try{
      res.render('pages/home', {
        title: 'Home',
        style: 'home.css', 
      })} catch(e){
        console.log(`Erro ao renderizar para a página Home: ${e}\n`)
      }
});

router.get('/home', getCalçados);
router.post('/addCalcado', createCalçado);

/*
router.get("/calcado/:id", getCalcado);
router.post("/cadastrarCalcado", cadastrarCalcado);
router.put("/updateCalcado/:id", updateCalcado);
router.delete("/deleteCalcado/:id", deleteCalcado);
*/
module.exports = router;