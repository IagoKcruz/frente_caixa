const FormaPagamento = require('../models/Formapagamento.js');
const TipoRecebimento = require('../models/TipoRecebimento.js');
const BasicRepository = require('./BasicRepository.js');
const { Op } = require("sequelize");

class FormaPagamentoRepository extends BasicRepository {
  constructor() {
    super(FormaPagamento);
  }

    async getAllFormasPagamento(descricao) {
      const whereClause = descricao ?
        { descricao: { [Op.like]: `%${descricao}%` } } :
        {}; 

        const formas = await FormaPagamento.findAll({
          where: whereClause
        });

        return formas;
    }
}

module.exports = new FormaPagamentoRepository();