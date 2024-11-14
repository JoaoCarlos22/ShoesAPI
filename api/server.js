const express = require('express');
const path = require('path');
var expbs = require('express-handlebars');
const {engine} = require('express-handlebars');
const connectDB = require('./db');
const calçadosRoutes = require('./routes/calcadosRoutes')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
*/

//const hbs = expbs.create()

app.use('/', calçadosRoutes)

app.engine(
    ".html",
    engine({
        //defaultLayout: 'mainLayout.hbs',
        //layoutsDir: '/layouts'
    })
);
app.set('view engine', 'html');
app.set('view engine', path.join(__dirname, 'views'))
/*
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
    defaultLayout: 'mainLayout.hbs', // Layout padrão (se estiver usando)
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
*/
connectDB()
.then(data => {
    console.log(' >> banco de dados conectado com sucesso:\n')
    app.listen(8000, () => {
        console.log('Servidor rodando na porta 8000:\n')
    }).on('error', err =>
        console.log('Erro ao ligar o servidor:\n', err))
})
.catch(err => console.log('Nao foi possivel conectar ao Banco de Dados:\n', err))