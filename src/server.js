const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes/routes.js');
const sequelize = require('./config/database'); // Conexão com o banco de dados
const { init } = require('./app/models/syncModels.js');
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

(async () => {
  try {
    // Sincroniza os modelos com o banco de dados
    await init();
    console.log('Modelos sincronizados com sucesso!');

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error.message);
  }
})();

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

/*

agora implemente um leyout responsivo em que eu mude apenas o body, ajeite os arquivos q eu preciso modificar

*/