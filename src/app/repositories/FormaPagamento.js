const FormaPagamento = require('./models/FormaPagamento.js');
const BasicRepository = require('./BasicReposiroty.js');

class FormaPagamentoRepository extends BasicRepository {
  constructor() {
    super(FormaPagamento);
  }
}

module.exports = FormaPagamentoRepository;