const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const connectDB = require('./db');
const calçadosRoutes = require('./routes/calcadosRoutes')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', calçadosRoutes)
app.use('styles/', express.static(path.join(__dirname, 'styles')));
app.use('assets/', express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
    extname: "hbs",
    layoutDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'mainLayout.hbs'
}))
app.set('view engine', '.hbs')

connectDB()
.then(data => {
    console.log(' >> banco de dados conectado com sucesso:\n')
    app.listen(8000, () => {
        console.log('Servidor rodando na porta 8000:\n')
    }).on('error', err =>
        console.log('Erro ao ligar o servidor:\n', err))
})
.catch(err => console.log('Nao foi possivel conectar ao Banco de Dados:\n', err))