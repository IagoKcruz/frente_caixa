require('dotenv').config();
const express = require('express');
const path = require('path');
const syncModels = require('./app/models/syncModels');
const addMenu = require('./app/middlewares/front/menu');
const routes = require('./app/routes/routes');
const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));
app.use(express.static(path.join(__dirname, 'app', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(addMenu);

app.use('/', routes);
// Inicia o servidor primeiro
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  try {
    const forceSync = process.env.DB_FORCE_SYNC === 'true';
    await syncModels(forceSync);
    console.log('Sincronização do banco concluída.');
  } catch (error) {
    console.error('Erro ao sincronizar modelos:', error);
  }
});


