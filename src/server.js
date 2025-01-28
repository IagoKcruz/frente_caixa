require('dotenv').config(); // Carrega variáveis de ambiente
const express = require('express');
const syncModels = require('./app/models/syncModels');
const routes = require('./app/routes/routes');

const app = express();
const PORT = 3000;

// Configurar middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar rotas
app.use('/api', routes);

// Sincronizar o banco de dados e iniciar o servidor
(async () => {
  const forceSync = process.env.DB_FORCE_SYNC === 'true'; // Controle via variável de ambiente
  await syncModels(forceSync); // Chama o syncModels para sincronizar as tabelas

  // Inicia o servidor após a sincronização
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})();
