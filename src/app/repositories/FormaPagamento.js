const FormaPagamento = require('../models/Formapagamento.js');
const BasicRepository = require('./BasicRepository.js');

class FormaPagamentoRepository extends BasicRepository {
  constructor() {
    super(FormaPagamento);
  }
}

module.exports = FormaPagamentoRepository;