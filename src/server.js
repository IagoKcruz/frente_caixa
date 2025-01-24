const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes/routes.js');
const sequelize = require('./config/database'); // Conexão com o banco de dados
require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do EJS para views
app.set('view engine', 'ejs');
app.set('views', './src/app/views');

// Rotas
app.use('/', routes);

sequelize
  .sync({ force: false }) 
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err.message);
  });

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});