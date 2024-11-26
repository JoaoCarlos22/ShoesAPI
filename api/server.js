// Importações necessárias
const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const connectDB = require('./db');
const calçadosRoutes = require('./src/routes/calcadosRoutes')

// Configurações do Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/ShoesSystem',calçadosRoutes)

// Configurações de arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'src/public')));

// Configurações do Express Handlebars (template engine)
app.set('views', path.join(__dirname, 'src/views'))
app.engine('.hbs', engine({
    extname: "hbs",
    layoutDir: path.join(__dirname, 'src/views/layouts'),
    defaultLayout: 'mainLayout.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set('view engine', '.hbs')

// Conecta ao banco de dados MongoDB e inicia o servidor web
connectDB()
.then(data => {
    console.log('\n >> Banco de dados conectado com sucesso!')
    app.listen(8000, () => {
        console.log(' >> Servidor rodando na porta 8000:')
        console.log(` >> http://localhost:8000/ShoesSystem/home`);
    }).on('error', err =>
        console.log('Erro ao ligar o servidor:\n', err))
})
.catch(err => console.log('Nao foi possivel conectar ao Banco de Dados:\n', err))