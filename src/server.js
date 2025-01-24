const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes/routes.js');
const sequelize = require('../../config/database');
const Cliente = require('./Cliente');
const Promocao = require('./Promocao');
const Municipio = require('./Municipio');
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


Cliente.belongsTo(Municipio, { foreignKey: 'municipio_id', as: 'municipio' });
Cliente.belongsTo(Promocao, { foreignKey: 'promocao_id', as: 'promocao' });
const syncModels = async () =>{ sequelize
  .sync({ force: false }) 
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err.message);
  });
}

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
module.exports = { sequelize, Cliente, Promocao, Municipio, syncModels };
/*

agora implemente um leyout responsivo em que eu mude apenas o body, ajeite os arquivos q eu preciso modificar

*/