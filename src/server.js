require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const syncModels = require('./app/models/syncModels');
const addMenu = require('./app/middlewares/front/MenuItems.js');
const routes = require('./app/routes/routes');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(session({
  secret: 'IAGO',  // Usado para assinar o ID da sessão
  resave: false,               // Não salva a sessão se ela não foi modificada
  saveUninitialized: true,     // Salva sessões não inicializadas
  cookie: { secure: false }    // Se estiver usando HTTPS, defina como true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));
app.use(express.static(path.join(__dirname, 'app', 'public')));
app.use(express.static(path.join(__dirname, 'app', 'utils')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(addMenu);

app.use('/caixa', routes);
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


